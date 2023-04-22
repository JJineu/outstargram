import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "@/app/components/UserProfile";

type Props = {
  params: {
    username: string;
  };
};
export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      {/* <UserDetailList /> */}
    </>
  );
}
