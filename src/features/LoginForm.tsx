"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import useAuth from "@/hooks/useAuth";
import Alert from "@/components/Alert";

const schema = z.object({
  email: z.string().email("Invalid email").min(5, "Email is too short"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const { loginAction, loading, success, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="shadow-lg mx-auto max-w-md w-full bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(loginAction)} className="space-y-4">
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password}
        />
        {error && <Alert message={error} type="error" />}
        {error && <Alert message={success} type="success" />}
        <Button loading={loading} type="submit" disabled={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
