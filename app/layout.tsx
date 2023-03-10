import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SideBar from "components/SideBar";
import { SessionProvider } from "components/SessionProvider";
import "@/styles/globals.css";
import Login from "components/Login";
import ClientProvider from "components/ClientProvider";

export const metadata = {
  title: "ChatGPT Application",
  description: "Typescript, Next.js, TailwindCSS, OpenAI, Firebase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div
                className="bg-[#202123] max-w-xs max-md:w-1/5
                h-screen overflow-y-auto md:min-w-[300px]"
              >
                <SideBar />
              </div>
              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
