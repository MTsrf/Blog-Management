"use client";

import LoadingComponent from "@/components/LoadingComponent";
import dynamic from "next/dynamic";

const CreatePostForm = dynamic(() => import("@/features/CreatePost"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function CreatePost() {
  return (
    <div className="container">
      <CreatePostForm />
    </div>
  );
}
