"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useMutation } from "@apollo/client";
// import { DELETE_POST } from "@/graphql/mutations/post.mutation";
import Link from "next/link";
import { FilePenLine } from "lucide-react";
import { DELETE_POST } from "@/graphql/mutations/post.mutation";
import { useMutation } from "@apollo/client";

interface PostActionsProps {
  postId: string;
  authorId: string;
  currentUserId: string | null;
}

export function PostActions({
  postId,
  authorId,
  currentUserId,
}: PostActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const [deletePost, { loading }] = useMutation(DELETE_POST);

  if (authorId !== currentUserId) {
    return null;
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { data } = await deletePost({
        variables: { id: postId },
      });

      if (!data?.deletePost?.success) {
        return alert(data?.deletePost?.message || "");
      }
      alert("Delete Success");
      router.push("/posts");
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <Link
        href={`/posts/edit-post/${postId}`}
        className="p-1  text-primary border border-gray-200 flex gap-1 items-center"
      >
        <FilePenLine size={15} />
        <span className="text-sm"> Edit Post</span>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting || loading}
        className="p-1 border border-gray-200 text-primary rounded disabled:opacity-50"
      >
        {isDeleting || loading ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  );
}
