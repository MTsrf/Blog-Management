import { prisma } from "@/lib/prisma";

export async function GET() {
  const response = await prisma.post.findMany();
  return Response.json(response);
}
