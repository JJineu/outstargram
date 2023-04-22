import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { follow, unFollow } from "@/service/user";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await request.json();

  if (!targetId || isFollow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const req = isFollow ? follow : unFollow;

  return req(user.id, targetId)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
