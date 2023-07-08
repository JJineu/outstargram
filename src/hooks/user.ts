import { HomeUser } from '@/types/user';
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
    (username: string, userId: string) => {
      if (!username || !userId) return;
      const followers = user?.followers ?? [];
      const newUser = {
        ...user,
        followers: [...followers, username],
      };

      return mutate(updateFollow(username, userId), {
        // optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );
  return { user, isLoading, error, setFollow };
}