'use client';
import ChatHome from "@components/Chat/ChatHome"
import Login from "@components/Auth/Login"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col p-4 h-screen m-auto">
      {session?.user ? <ChatHome /> : <Login />}
    </main >
  )
}
