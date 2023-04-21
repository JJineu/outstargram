import React from "react";

type Props = {
  params: {
    slug: string;
  };
};
export default function UserPage({ params: { slug } }: Props) {
  // api 로 user 정보 검색하여 포스트, 팔로잉하는 사람 post를 가져온다.
  // const {user, follower, } = await get...(slug);
  // const {} = post;
  return <div>page</div>;
}
