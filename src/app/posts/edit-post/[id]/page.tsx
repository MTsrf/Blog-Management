"use client";

import LoadingComponent from "@/components/LoadingComponent";
import dynamic from "next/dynamic";

const EditPostForm = dynamic(() => import("@/features/EditPostForm"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function CreatePost() {
  return (
    <div className="container">
      <EditPostForm />
    </div>
  );
}
