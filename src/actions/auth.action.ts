"use client";

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

interface AuthActionType {
  id: string;
  auth_token: string;
  iAuthenticated: boolean;
  name: string;
}
export const AuthAction = async (
  values: AuthActionType,
  callbackUrl?: string | null
) => {
  try {
    const resp = await signIn("credentials", {
      ...values,
      redirectTo: callbackUrl || "/",
    });
    return { success: true, data: resp };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
