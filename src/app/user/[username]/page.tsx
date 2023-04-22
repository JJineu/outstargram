import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "@/app/components/UserProfile";
import UserPosts from "@/app/components/UserPosts";

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
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
