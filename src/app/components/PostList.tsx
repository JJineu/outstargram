"use client";

import { SimplePost } from "@/model/post";
import { DetailUser } from "@/model/user";
import useSWR from "swr";

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/post");
  return (
    <>
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}
      </ul>
      {/* {(!users || users.length === 0) && <p>{`You don't have following`}</p>} */}
      {/* {users && users.length > 0 &&} */}
    </>
  );
}
