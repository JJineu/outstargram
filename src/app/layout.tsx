import AuthContext from "@/context/AuthContext";
import Footer from "./components/Footers";
import Header from "./components/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Outstargram",
    template: "Outstargram | %s",
  },
  description: "Create and share with your friends",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="flex flex-col w-full max-w-screen-2xl overflow-auto mx-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <Header />
          </header>
          <main className="grow">{children}</main>
        </AuthContext>
        <Footer />
      </body>
    </html>
  );
}
