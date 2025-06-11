//route "/items/:itemId/chat"
"use client";

import { useParams } from "next/navigation";
import ChatComponent from "../../../components/ChatComponent";

export default function ChatPage() {
  const params = useParams();
  const itemId = params.itemId as string;

  return <ChatComponent itemId={itemId} currentUser="testUser" />;
}
