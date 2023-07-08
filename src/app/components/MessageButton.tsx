"use client";

import { ProfileUser } from '@/types/user';
import Button from "./ui/Button";
import { useMe } from "@/hooks/me";
import { useRouter } from "next/navigation";

type Props = {
  user: ProfileUser;
};
export default function MessageButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const router = useRouter();
  const handleMessage = () => {
    router.push(`/message/${username}`);
  };
  return (
    <>
      {showButton && (
        <Button text={"Message"} onClick={handleMessage} active={true} />
      )}
    </>
  );
}
