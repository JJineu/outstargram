import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/app/components/Signin";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Outstargram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center m-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
