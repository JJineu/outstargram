import { NextRequest, NextResponse } from 'next/server';
import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await request.json();

    if (!id || bookmark == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const req = bookmark ? addBookmark : removeBookmark;

    return req(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
