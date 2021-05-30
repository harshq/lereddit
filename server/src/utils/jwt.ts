import { sign } from "jsonwebtoken";
import { User } from "../entities/User";

export const createAccessToken = (user: User): string => {
  return sign({ ...user }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (user: User): string => {
  return sign({ ...user }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};
