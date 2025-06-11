import type { Socket } from "socket.io-client";

export interface Message {
  sender: string;
  message: string;
  timestamp: string | Date;
}

export interface ChatEvents {
  // Client to Server events
  joinChat: (data: { chatId: string }) => void;
  sendMessage: (data: {
    chatId: string;
    sender: string;
    message: string;
  }) => void;

  // Server to Client events
  chatHistory: (messages: Message[]) => void;
  receiveMessage: (message: Message) => void;
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: Error) => void;
}

export interface ChatComponentProps {
  itemId: string;
  currentUser?: string;
}

export interface UseSocketProps {
  serverUrl: string;
  autoConnect?: boolean;
}

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}
