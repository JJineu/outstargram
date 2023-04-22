"use client";

import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import Scrollablebar from "./Scrollablebar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.following;

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-md shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <PulseLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <Scrollablebar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </Scrollablebar>
      )}
    </section>
  );
}
