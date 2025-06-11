"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatComponent from "../../../components/ChatComponent";
import { useUser } from "../../../../contexts/UserContext";

export default function ChatPage() {
  const { user, isHydrated } = useUser();
  const params = useParams();
  const router = useRouter();
  const itemId = params.itemId as string;

  useEffect(() => {
    // Redirect if user is not logged in (null) and app is hydrated
    if (isHydrated && !user) {
      router.push("/guest");
    }
  }, [user, isHydrated, router]);

  // While redirecting or loading user state, don't show anything
  if (!isHydrated || !user) return null;

  return <ChatComponent itemId={itemId} currentUser={user} />;
}
