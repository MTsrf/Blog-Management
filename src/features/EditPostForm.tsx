"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_POST } from "@/graphql/mutations/post.mutation";
import { useParams, useRouter } from "next/navigation";
import { GET_POST_BY_ID } from "@/graphql/query/post.query";
import LoadingComponent from "@/components/LoadingComponent";
import { Post } from "@/types";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const schema = z.object({
  title: z.string().nonempty({ message: "Field is Required" }),
  content: z.string().nonempty({ message: "Field is Required" }),
});

export type BlogFormData = z.infer<typeof schema>;
type PostResponse = {
  status: number;
  message: string;
  success: boolean;
  data: Post;
};

type GetPostByIdResponse = {
  getPostById: PostResponse;
};
const EditPostForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const editor = useRef(null);

  const { data, loading: queryLoading } = useQuery<GetPostByIdResponse>(
    GET_POST_BY_ID,
    {
      variables: { id },
    }
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mutateHandleUpdateCreate, { loading }] = useMutation(EDIT_POST);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (data?.getPostById.data) {
      reset({
        title: data.getPostById?.data?.title,
        content: data.getPostById?.data?.content,
      });
    }
  }, [data?.getPostById?.data, reset]);

  const onSubmit = async (values: BlogFormData) => {
    try {
      const { data } = await mutateHandleUpdateCreate({
        variables: {
          id,
          input: {
            title: values?.title,
            content: values?.content,
          },
        },
      });
      if (!data?.editPost.success) {
        throw new Error(data?.editPost?.message);
      }
      setSuccess(data?.editPost.message);
      setTimeout(() => {
        router.push("/posts");
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  };

  const config = {
    toolbarAdaptive: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "fontsize",
      "paragraph",
      "brush",
      "align",
      "|",
      "undo",
      "redo",
      "copyformat",
      "eraser",
      "fullsize",
    ],
    uploader: { insertImageAsBase64URI: false },
    filebrowser: {
      zIndex: 1,
      fullsize: true,
      showTooltip: true,
    },
  };
  if (queryLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="shadow-lg mx-auto max-w-4xl w-full bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Title"
          type="text"
          placeholder="Title"
          {...register("title")}
          error={errors.title}
        />

        <div>
          <label className="block text-gray-700 font-medium">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <JoditEditor
                ref={editor}
                value={field.value}
                config={config}
                onChange={(newContent) => field.onChange(newContent)}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {error && <Alert message={error} type="error" />}
        {success && <Alert message={success} type="success" />}

        <Button type="submit" loading={loading} disabled={loading}>
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default EditPostForm;
