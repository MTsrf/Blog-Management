"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/mutations/post.mutation";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const schema = z.object({
  title: z.string().nonempty({ message: "Field is Required" }),
  content: z.string().nonempty({ message: "Field is Required" }),
});

export type BlogFormData = z.infer<typeof schema>;

const CreatePost = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mutateHandlePostCreate, { loading }] = useMutation(CREATE_POST);
  const editor = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: BlogFormData) => {
    try {
      const { data } = await mutateHandlePostCreate({
        variables: {
          ...values,
        },
      });
      if (!data?.createPost.success) {
        throw new Error(data?.createPost?.message);
      }
      setSuccess(data?.createPost.message);
      console.log({ data });
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

  return (
    <div className="shadow-lg mx-auto max-w-4xl w-full bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Input */}
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
                onBlur={(newContent) => {
                  console.log({ newContent });
                }}
                config={config}
                onChange={(newContent) => {
                  field.onChange(newContent);
                }}
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
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
