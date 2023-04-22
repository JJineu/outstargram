import AuthContext from "@/context/AuthContext";
import Header from "./components/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import SWRConfigContext from "@/context/SWRConfigContext";

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
      <body className="w-full bg-neutral-50 overflow-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Header />
            </div>
          </header>
          <main className="w-full flex justify-center bg-neutral-50">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
