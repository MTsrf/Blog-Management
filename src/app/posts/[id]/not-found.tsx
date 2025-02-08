import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="h-20"></div>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/posts"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Post
        </Link>
      </div>
    </div>
  );
}
