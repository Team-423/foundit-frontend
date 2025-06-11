import React, { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, X, User } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  timestamp: string | Date;
}

interface ChatComponentProps {
  itemId: string;
  currentUser?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  itemId,
  currentUser = "Anonymous",
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatId = `item_${itemId}`;

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && !socket) {
      // Initialize socket connection
      const newSocket = io("https://foundit-backend-dg0o.onrender.com", {
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        console.log("Connected to chat server");
        setIsConnected(true);
        newSocket.emit("joinChat", { chatId });
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from chat server");
        setIsConnected(false);
      });

      newSocket.on("chatHistory", (history: Message[]) => {
        setMessages(history);
      });

      newSocket.on("receiveMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on("connect_error", (error: Error) => {
        console.error("Connection error:", error);
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [isChatOpen, chatId, socket]);

  const sendMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    if (newMessage.trim() && socket && isConnected) {
      socket.emit("sendMessage", {
        chatId,
        sender: currentUser,
        message: newMessage.trim(),
      });
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string | Date): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-[#5a189a] hover:bg-[#3c096c] text-white p-4 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="hidden sm:inline">Chat about this item</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-96 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col">
      {/* Chat Header */}
      <div className="bg-[#5a189a] text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <h3 className="font-semibold text-sm">Item Discussion</h3>
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-400" : "bg-red-400"
            }`}
          ></div>
        </div>
        <button
          onClick={() => setIsChatOpen(false)}
          className="hover:bg-[#3c096c] p-1 rounded"
        >
          <X size={16} />
        </button>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-100 text-yellow-800 text-xs p-2 text-center">
          Connecting to chat...
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-8">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p>No messages yet.</p>
            <p>Start the conversation about this item!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.sender === currentUser
                    ? "bg-[#5a189a] text-white rounded-br-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <User size={12} className="opacity-70" />
                  <span
                    className={`text-xs font-medium ${
                      msg.sender === currentUser
                        ? "text-purple-200"
                        : "text-gray-600"
                    }`}
                  >
                    {msg.sender}
                  </span>
                  <span
                    className={`text-xs ml-auto ${
                      msg.sender === currentUser
                        ? "text-purple-200"
                        : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="break-words">{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            disabled={!isConnected}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a189a] focus:border-transparent text-sm disabled:bg-gray-100"
            maxLength={500}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="bg-[#5a189a] hover:bg-[#3c096c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {newMessage.length}/500 characters
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
