import { Context as BaseContext } from "@the-devoyage/micro-auth-helpers";
import { Mutation, Query } from "types/generated";

export type PaywallPurchase = {
  paywall: { _id: string };
  status: string;
};

export interface Context extends BaseContext {
  paywallPurchase?: PaywallPurchase;
  paywallPermissions: Record<
    keyof Omit<Query & Mutation, "__typename">,
    boolean
  >;
}
