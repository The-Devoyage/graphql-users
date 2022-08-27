import { UpdateUserInput, User as IUser } from "types/generated";
import { Context } from "@the-devoyage/micro-auth-helpers";
import { User } from "@src/models";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";

export const updateMembership = async (
  updateUserInput: UpdateUserInput,
  context: Context
): Promise<IUser | null> => {
  if (updateUserInput.payload.memberships) {
    const { filter } = GenerateMongo<IUser>({
      fieldFilters: updateUserInput.query,
    });

    const user = await User.findOne<IUser>(filter);

    if (!user) {
      throw new Error("User does not exist.");
    }

    const membership = user?.memberships.find(
      (m) =>
        m.account.toString() ===
        updateUserInput.payload.memberships?.account.toString()
    );

    const isInvited =
      user._id === context.auth.payload.user?._id.toString() ||
      user.email === context.auth.payload.account?.email;

    const hasInvited =
      updateUserInput.payload.memberships.account.toString() ===
      context.auth.payload.account?._id;

    if (
      updateUserInput.payload.memberships.default !== undefined &&
      !isInvited
    ) {
      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload?.user?.role,
        roleLimit: 1,
        errorMessage:
          "You do not have permission to edit the `default` property.",
      });
    }

    if (
      updateUserInput.payload.memberships.role &&
      updateUserInput.payload.memberships.role < 10
    ) {
      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload?.user?.role,
        roleLimit: 1,
        errorMessage: "You may not set a role less than 10.",
      });
    }

    if (!isInvited && !hasInvited) {
      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload?.user?.role,
        roleLimit: 1,
        errorMessage:
          "Only admins and account holders may manage this membership.",
      });
    }

    if (updateUserInput.payload.memberships.status) {
      switch (membership?.status) {
        case "REVOKED": {
          if (!hasInvited) {
            Helpers.Resolver.LimitRole({
              userRole: context.auth.payload?.user?.role,
              roleLimit: 1,
              errorMessage: "You do not have permission to change this status.",
            });
          } else if (
            hasInvited &&
            updateUserInput.payload.memberships.status !== "PENDING"
          ) {
            Helpers.Resolver.LimitRole({
              userRole: context.auth.payload?.user?.role,
              roleLimit: 1,
              errorMessage: "You may only set the status to PENDING.",
            });
          }
          break;
        }
        case "PENDING":
        case "ACTIVE":
        case "INACTIVE": {
          if (
            updateUserInput.payload.memberships.status !== "ACTIVE" &&
            updateUserInput.payload.memberships.status !== "INACTIVE" &&
            updateUserInput.payload.memberships.status !== "REVOKED"
          ) {
            Helpers.Resolver.LimitRole({
              userRole: context.auth.payload?.user?.role,
              roleLimit: 1,
              errorMessage: `Memberships with status of ${membership.status} may only be switched to ACTIVE, INACTIVE, or REVOKED.`,
            });
          } else {
            if (isInvited && !hasInvited) {
              if (
                updateUserInput.payload.memberships.status !== "ACTIVE" &&
                updateUserInput.payload.memberships.status !== "INACTIVE"
              ) {
                Helpers.Resolver.LimitRole({
                  userRole: context.auth.payload?.user?.role,
                  roleLimit: 1,
                  errorMessage:
                    "Your role only allows you to set the membership status to Active or Inactive.",
                });
              }
            } else if (hasInvited && !isInvited) {
              if (updateUserInput.payload.memberships.status !== "REVOKED") {
                Helpers.Resolver.LimitRole({
                  userRole: context.auth.payload?.user?.role,
                  roleLimit: 1,
                  errorMessage:
                    "Your role only allows you to set the status to Revoked.",
                });
              }
            } else {
              Helpers.Resolver.LimitRole({
                userRole: context.auth.payload?.user?.role,
                roleLimit: 1,
                errorMessage: "You do not have permission to edit this status.",
              });
            }
          }
          break;
        }
        default: {
          if (
            !isInvited &&
            updateUserInput.payload.memberships?.status !== "PENDING"
          ) {
            Helpers.Resolver.LimitRole({
              userRole: context.auth.payload?.user?.role,
              roleLimit: 1,
              errorMessage: "Initial status should be PENDING.",
            });
          }
        }
      }
    }

    if (
      updateUserInput.payload.memberships.default === true &&
      updateUserInput.payload.memberships.role &&
      updateUserInput.payload.memberships.role > 10
    ) {
      throw new Error(
        "Default memberships may not have a role greater than 10."
      );
    }

    if (
      updateUserInput.payload.memberships.default === true &&
      membership?.default !== true
    ) {
      const accountHasDefaultUser = await User.exists({
        memberships: {
          $elemMatch: {
            $and: [
              {
                account: membership?.account._id,
              },
              { default: true },
            ],
          },
        },
      });
      if (accountHasDefaultUser) {
        throw new Error("This account already has a default membership.");
      }
    }

    if (membership) {
      const updated = await User.findOneAndUpdate<IUser>(
        {
          _id: user._id,
          "memberships.account": membership?.account._id,
        },
        {
          $set: {
            "memberships.$.account":
              updateUserInput.payload.memberships.account.toString() ??
              membership?.account,
            "memberships.$.role":
              updateUserInput.payload.memberships.role ?? membership?.role,
            "memberships.$.status":
              updateUserInput.payload.memberships.status ?? membership?.status,
            "memberships.$.local":
              updateUserInput.payload.memberships.local ?? membership?.local,
            "memberships.$.default":
              updateUserInput.payload.memberships.default ??
              membership?.default,
          },
        },
        {
          new: true,
        }
      );

      await User.populate(updated, { path: "created_by" });
      await User.populate(updated, { path: "memberships.created_by" });

      return updated;
    } else {
      const updated = await User.findOneAndUpdate<IUser>(
        {
          _id: user._id,
        },
        {
          $addToSet: {
            memberships: {
              account: updateUserInput.payload.memberships.account,
              role: updateUserInput.payload.memberships.role,
              status: updateUserInput.payload.memberships.status,
              local: updateUserInput.payload.memberships.local,
              default: updateUserInput.payload.memberships.default,
              created_by: context.auth.payload.user?._id,
            },
          },
        },
        {
          new: true,
        }
      );
      await User.populate(updated, { path: "created_by" });
      await User.populate(updated, { path: "memberships.created_by" });

      return updated;
    }
  }
  return null;
};
