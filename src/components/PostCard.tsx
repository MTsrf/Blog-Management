import { formatTimestamp } from "@/lib/utils";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link
      href={`/posts/${post?.id}`}
      className="bg-white shadow-md rounded-lg p-4 mb-6 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-52 mb-4">
        <Image
          src={
            "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
          }
          alt={post.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2 mb-4">
        <span>By {post?.author?.name || ""}</span>
        <span>{formatTimestamp(post?.updatedAt)}</span>
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 break-words">
          {post.title}
        </h2>

        <div className="text-gray-700 text-sm break-words line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
