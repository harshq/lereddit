import { Context } from "../types/context";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const user = context.req.user;

  if (!user) {
    return false;
  }

  return true;
};
