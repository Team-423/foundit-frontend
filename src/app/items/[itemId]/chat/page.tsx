//route "/items/:itemId/chat"
"use client";

import { useParams } from "next/navigation";
import ChatComponent from "../../../components/ChatComponent";
import { useUser } from "../../../../contexts/UserContext";

export default function ChatPage() {
  const { user } = useUser();
  const params = useParams();
  const itemId = params.itemId as string;
  return <ChatComponent itemId={itemId} currentUser={user} />;
}
