import { HomeUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateFollow(username: string, userId: string) {
  return fetch("/api/user", {
    method: "PUT",
    body: JSON.stringify({ username, userId }),
  }).then((res) => res.json());
}

export function useUser(userId: string) {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<HomeUser>(`/api/user/${userId}`);

  const setFollow = useCallback(
    (username: string, userId: boolean) => {
      if (!username || !userId) return;
      const followers = user?.followers ?? [];
      const newUser = {
        ...user,
        followers: [...followers, username],
      };

      return mutate(updateFollow(username, userId), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );
  return { user, isLoading, error, setFollow };
}

// import { Comment, FullPost } from "@/model/post";
// import { useCallback } from "react";
// import useSWR, { useSWRConfig } from "swr";

// async function addComment(id: string, comment: string) {
//   return fetch("/api/comments", {
//     method: "POST",
//     body: JSON.stringify({ id, comment }),
//   }).then((res) => res.json());
// }

// export default function useFullPosts(postId: string) {
//   const {
//     data: post,
//     isLoading,
//     error,
//     mutate,
//   } = useSWR<FullPost>(`/api/post/${postId}`);

//   const { mutate: globalMutate } = useSWRConfig();

//   const postComment = useCallback(
//     (comment: Comment) => {
//       if (!post) return;
//       const newPost = {
//         ...post,
//         comments: [...post.comments, comment],
//       };

//       return mutate(addComment(post.id, comment.comment), {
//         optimisticData: newPost,
//         populateCache: false,
//         revalidate: false,
//         rollbackOnError: true,
//       }).then(() => globalMutate("/api/post"));
//     },
//     [post, mutate, globalMutate]
//   );
//   return { post, isLoading, error, postComment };
// }
