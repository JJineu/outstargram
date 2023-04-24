import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createPost, getFollwingPostsOf } from "@/service/post";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollwingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await request.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, text, file) //
    .then((data) => NextResponse.json(data));
}
