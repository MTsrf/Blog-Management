/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_POST_BY_ID } from "@/graphql/query/post.query";
import { clientServer } from "@/lib/apollo-client";
import { formatTimestamp } from "@/lib/utils";
import { Post } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type PostResponse = {
  status: number;
  message: string;
  success: boolean;
  data: Post;
};

type GetPostByIdResponse = {
  getPostById: PostResponse;
};
export default async function Page({ params }: { params: { id: string } }) {
  const client = clientServer();
  const id = (await params)?.id;

  try {
    const { data } = await client.query<GetPostByIdResponse>({
      query: GET_POST_BY_ID,
      variables: { id: id },
    });

    if (!data?.getPostById?.success || !data?.getPostById?.data) {
      notFound();
    }

    return (
      <div className="container">
        <div className="h-8"></div>
        <div className="shadow-sm max-w-5xl mx-auto w-full bg-white p-20">
          <div>
            <h1 className="text-5xl text-[#3b3b3b] font-medium">
              {data?.getPostById?.data?.title}
            </h1>
            <div className="h-5"></div>
            <div className="flex justify-between border-b border-primary">
              <span>
                Updated on {formatTimestamp(data?.getPostById?.data?.updatedAt)}
              </span>
              <span>
                By {"  "} {data?.getPostById?.data?.author?.name}
              </span>
            </div>
            <div className="h-5"></div>
          </div>
          <div className="relative w-full h-[500px] mb-4">
            <Image
              src={
                "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
              }
              fill
              className="object-cover"
              alt="hi"
            />
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.getPostById?.data?.content,
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
