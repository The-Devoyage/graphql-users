import { UpdateUserInput, User as IUser } from "types/generated";
import { Context } from "@the-devoyage/micro-auth-helpers";
import { User } from "@src/models";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";

export const updateMembership = async (
  updateUserInput: UpdateUserInput,
  context: Context
): Promise<IUser | null> => {
  if (updateUserInput.memberships) {
    const { filter } = GenerateMongo<IUser>({
      fieldFilters: updateUserInput.user,
    });

    const user = await User.findOne<IUser>(filter);

    if (!user) {
      throw new Error("User does not exist.");
    }

    const membership = user?.memberships.find(
      (m) =>
        m.account.toString() === updateUserInput.memberships?.account.toString()
    );

    const isInvited =
      user._id === context.auth.payload.user?._id.toString() ||
      user.email === context.auth.payload.account?.email;

    const hasInvited =
      updateUserInput.memberships.account.toString() ===
      context.auth.payload.account?._id;

    if (updateUserInput.memberships.default !== undefined && !isInvited) {
      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload?.user?.role,
        roleLimit: 1,
        errorMessage:
          "You do not have permission to edit the `default` property.",
      });
    }

    if (
      updateUserInput.memberships.role &&
      updateUserInput.memberships.role < 10
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

    if (updateUserInput.memberships.status) {
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
            updateUserInput.memberships.status !== "PENDING"
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
            updateUserInput.memberships.status !== "ACTIVE" &&
            updateUserInput.memberships.status !== "INACTIVE" &&
            updateUserInput.memberships.status !== "REVOKED"
          ) {
            Helpers.Resolver.LimitRole({
              userRole: context.auth.payload?.user?.role,
              roleLimit: 1,
              errorMessage: `Memberships with status of ${membership.status} may only be switched to ACTIVE, INACTIVE, or REVOKED.`,
            });
          } else {
            if (isInvited && !hasInvited) {
              if (
                updateUserInput.memberships.status !== "ACTIVE" &&
                updateUserInput.memberships.status !== "INACTIVE"
              ) {
                Helpers.Resolver.LimitRole({
                  userRole: context.auth.payload?.user?.role,
                  roleLimit: 1,
                  errorMessage:
                    "Your role only allows you to set the membership status to Active or Inactive.",
                });
              }
            } else if (hasInvited && !isInvited) {
              if (updateUserInput.memberships.status !== "REVOKED") {
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
          if (!isInvited && updateUserInput.memberships?.status !== "PENDING") {
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
      membership?.default === true &&
      updateUserInput.memberships.role &&
      updateUserInput.memberships.role > 10
    ) {
      throw new Error(
        "Default memberships may not have a role greater than 10."
      );
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
              updateUserInput.memberships.account.toString() ??
              membership?.account,
            "memberships.$.role":
              updateUserInput.memberships.role ?? membership?.role,
            "memberships.$.status":
              updateUserInput.memberships.status ?? membership?.status,
            "memberships.$.local":
              updateUserInput.memberships.local ?? membership?.local,
            "memberships.$.default":
              updateUserInput.memberships.default ?? membership?.default,
          },
        },
        {
          new: true,
        }
      );
      return updated;
    } else {
      const updated = await User.findOneAndUpdate<IUser>(
        {
          _id: user._id,
        },
        {
          $addToSet: {
            memberships: {
              account: updateUserInput.memberships.account,
              role: updateUserInput.memberships.role,
              status: updateUserInput.memberships.status,
              local: updateUserInput.memberships.local,
              default: updateUserInput.memberships.default,
            },
          },
        },
        {
          new: true,
        }
      );
      return updated;
    }
  }
  return null;
};
