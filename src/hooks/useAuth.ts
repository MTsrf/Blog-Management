import { useMutation } from "@apollo/client";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
} from "../graphql/mutations/auth.mutation";
import { SingUpFormData } from "@/features/SignUpForm";
import { useState } from "react";
import { AuthAction } from "@/actions/auth.action";
import { LoginFormData } from "@/features/LoginForm";

const useAuth = () => {
  const [mutateHandleSignUp, { loading: loadingSignUp }] =
    useMutation(SIGNUP_MUTATION);

  const [mutateHandleLogin, { loading: loadingLogin }] =
    useMutation(LOGIN_MUTATION);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const loading = loadingSignUp || isLoading || loadingLogin;
  const signUpAction = async (values: SingUpFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    const { name, email, password } = values;
    try {
      const { data } = await mutateHandleSignUp({
        variables: { name, email, password },
      });
      if (!data?.signup?.success) {
        return setError(data?.signup.message || "");
      }
      setSuccess(data?.signup.message || "");
      const { token, user } = data?.signup?.data;
      const AuthData = {
        id: user?.id,
        auth_token: token,
        iAuthenticated: true,
        name: user?.name,
      };

      await AuthAction(AuthData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loginAction = async (values: LoginFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await mutateHandleLogin({ variables: { ...values } });
      if (!data?.login?.success) {
        return setError(data?.login.message || "");
      }
      setSuccess(data?.login.message || "");
      const { token, user } = data?.login?.data;
      const AuthData = {
        id: user?.id,
        auth_token: token,
        iAuthenticated: true,
        name: user?.name,
      };

      await AuthAction(AuthData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUpAction,
    loginAction,
    error,
    success,
    loading,
  };
};

export default useAuth;
