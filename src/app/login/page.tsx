"use client";

import LoadingComponent from "@/components/LoadingComponent";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/features/LoginForm"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function Login() {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}
