/* eslint-disable @typescript-eslint/no-unused-vars */
import LoadingComponent from "@/components/LoadingComponent";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import SearchForm from "@/features/SearchForm";
import { POSTS_LIST } from "@/graphql/query/post.query";
import { clientServer } from "@/lib/apollo-client";
import type { Post } from "@/types";
import Link from "next/link";

type PageInfo = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
export interface PostConnection {
  posts: Post[];
  pageInfo: PageInfo;
  totalPosts: number;
}

export interface PostResponse {
  getPosts: PostConnection;
}

export default async function Post({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const POSTS_PER_PAGE = 6;
  const client = clientServer();
  try {
    const query = (await searchParams)?.query;
    const currentPage = Number((await searchParams)?.page) || 1;

    const { data, loading } = await client.query<PostResponse>({
      query: POSTS_LIST,
      variables: {
        page: currentPage,
        limit: POSTS_PER_PAGE,
        search: query,
      },
    });
    const { posts, pageInfo } = data.getPosts;

    return (
      <div className="container">
        <section className="flex flex-col gap-4 mb-8">
          {posts?.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="h-20"></div>
              <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>

              <Link
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Post
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <SearchForm query={query} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <LoadingComponent />
                ) : (
                  posts.map((post) => {
                    return <PostCard key={post.id} post={post} />;
                  })
                )}
              </div>
              <Pagination pageInfo={pageInfo} currentPage={currentPage} />
            </>
          )}
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="container">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-red-500">
            Error loading posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
