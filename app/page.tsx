'use client';

import { Notes } from "@/components/Notes";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  /*if(!user) {
    return <LoginPage/>;
  }*/
  return (
    <>
    <Notes/>
    </>
  );
}
