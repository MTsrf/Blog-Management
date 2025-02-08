import PostCard from "@/components/PostCard";
import { GET_POSTS } from "@/graphql/query/post.query";
import { clientServer } from "@/lib/apollo-client";
import { Post } from "@/types";
import Link from "next/link";
import React from "react";

export interface PostConnection {
  posts: Post[];
}

export interface PostResponse {
  getPosts: PostConnection;
}
export default async function Home() {
  const client = clientServer();
  const { data } = await client.query<PostResponse>({
    query: GET_POSTS,
  });
  const Posts = data?.getPosts.posts;
  return (
    <div className="container">
      <section className="w-full flex items-center justify-center min-h-52 mb-12">
        <div className="bg-black shadow-md p-6 rounded-md">
          <h1 className="text-white text-center text-4xl font-bold">
            MAKES YOUR IDEAS
          </h1>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="w-full flex justify-center mb-4">
          <Link
            href={"/posts"}
            className="p-4 bg-primary text-white hover:shadow"
          >
            View All Post
          </Link>
        </div>
      </section>
    </div>
  );
}
