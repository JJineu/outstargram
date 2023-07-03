import { Metadata } from "next";
import MessageRoom from "../../components/MessageRoom";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Message room",
  description: "Send message to user",
};

type Props = {
  params: {
    username: string;
  };
};

export default async function MessagePage({ params: { username } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="flex flex-col w-full">
      <MessageRoom me={session.user} username={username} />
    </div>
  );
}
