"use client";

import useAuth from "@/hooks/useAuth";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
  .object({
    name: z.string().nonempty({ message: "Field is Required" }),
    email: z.string().email("Invalid email").min(5, "Email is too short"),
    password: z.string().min(6, "Must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SingUpFormData = z.infer<typeof schema>;
const SignUpForm = () => {
  const { signUpAction, loading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="shadow-lg mx-auto max-w-md w-full bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(signUpAction)} className="space-y-4">
        <TextField
          label="Name"
          type="text"
          placeholder="Enter your Name"
          {...register("name")}
          error={errors.name}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Enter your Confirm password"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />
        {error && <Alert message={error} type="error" />}
        {error && <Alert message={success} type="success" />}
        <Button loading={loading} type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
