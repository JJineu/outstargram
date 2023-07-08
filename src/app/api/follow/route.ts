import { NextRequest, NextResponse } from 'next/server';
import { follow, unFollow } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await request.json();

    if (!targetId || isFollow == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const req = isFollow ? follow : unFollow;

    return req(user.id, targetId)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
