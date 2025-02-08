import { TokenPayload } from "@/graphql/resolvers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export function signToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "7d",
  });
}
export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  return decoded;
}

export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return error;
  }
};
