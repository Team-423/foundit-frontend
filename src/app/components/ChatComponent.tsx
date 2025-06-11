"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, MessageCircle, User, ArrowLeft } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  timestamp: string | Date;
}

interface ChatComponentProps {
  itemId: string;
  currentUser?: string;
  onBack?: () => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  itemId,
  currentUser = "Anonymous",
  onBack,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const chatId = `item_${itemId}`;

  const scrollToBottom = useCallback((): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    // Initialize socket connection
    if (!socketRef.current) {
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

      socketRef.current = newSocket;
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [chatId]);

  const sendMessage = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLInputElement>
        | React.FormEvent<HTMLFormElement>
    ): void => {
      e.preventDefault();
      if (newMessage.trim() && socketRef.current && isConnected) {
        socketRef.current.emit("sendMessage", {
          chatId,
          sender: currentUser,
          message: newMessage.trim(),
        });
        setNewMessage("");
      }
    },
    [newMessage, isConnected, chatId, currentUser]
  );

  const formatTime = useCallback((timestamp: string | Date): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(e);
      }
    },
    [sendMessage]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewMessage(e.target.value);
    },
    []
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <header className="bg-[#5a189a] text-white px-4 py-4 shadow-lg flex-shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="hover:bg-[#3c096c] p-2 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <MessageCircle size={24} />
            <div>
              <h1 className="font-bold text-lg">Item Discussion</h1>
              <p className="text-purple-200 text-sm">
                Chat about item #{itemId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-400" : "bg-red-400"
              }`}
              aria-label={isConnected ? "Connected" : "Disconnected"}
            />
            <span className="text-sm">
              {isConnected ? "Connected" : "Connecting..."}
            </span>
          </div>
        </div>
      </header>

      {/* Connection Status Banner */}
      {!isConnected && (
        <div
          className="bg-yellow-100 text-yellow-800 text-sm py-2 px-4 text-center flex-shrink-0"
          role="alert"
        >
          Connecting to chat server...
        </div>
      )}

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full flex flex-col justify-end min-h-[300px]">
          <div className="flex-1 flex flex-col justify-end">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
                <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
                <p className="text-lg">
                  Start the conversation about this item!
                </p>
              </div>
            ) : (
              <div
                className="space-y-4"
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.sender}-${msg.timestamp}-${index}`}
                    className={`flex ${
                      msg.sender === currentUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                        msg.sender === currentUser
                          ? "bg-[#5a189a] text-white rounded-br-md"
                          : "bg-white border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <User size={14} className="opacity-70" />
                        <span
                          className={`text-sm font-medium ${
                            msg.sender === currentUser
                              ? "text-purple-200"
                              : "text-gray-600"
                          }`}
                        >
                          {msg.sender}
                        </span>
                        <time
                          className={`text-xs ml-auto ${
                            msg.sender === currentUser
                              ? "text-purple-200"
                              : "text-gray-400"
                          }`}
                          dateTime={new Date(msg.timestamp).toISOString()}
                        >
                          {formatTime(msg.timestamp)}
                        </time>
                      </div>
                      <p className="break-words leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input */}
      <footer className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={sendMessage}>
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder={
                  isConnected ? "Type your message..." : "Connecting..."
                }
                disabled={!isConnected}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a189a] focus:border-transparent disabled:bg-gray-100 text-base"
                maxLength={500}
                onKeyDown={handleKeyPress}
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || !isConnected}
                className="bg-[#5a189a] hover:bg-[#3c096c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2"
                aria-label="Send message"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
          <div className="text-xs text-gray-500 mt-2 text-center">
            {newMessage.length}/500 characters
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatComponent;
