import { NextRequest, NextResponse } from "next/server";
import { dislikePost, likePost } from "@/service/post";
import { withSessionUser } from "@/util/session";

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, like } = await request.json();

    if (!id || like == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const req = like ? likePost : dislikePost;

    return req(id, user.id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
