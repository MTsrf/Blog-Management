"use client";

import LoadingComponent from "@/components/LoadingComponent";
import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("@/features/SignUpForm"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function Login() {
  return (
    <div className="container">
      <SignUpForm />
    </div>
  );
}
