"use client";
import { useUser } from "../../contexts/UserContext";

export default function DebugHeader() {
  const { isLoggedIn, user, logout } = useUser();

  return (
    <header className="sticky top-0 bg-yellow-100 border-b border-yellow-200 p-3 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-yellow-800">Debug Console:</span>
          <span className="text-sm">
            Status:{" "}
            <strong>{isLoggedIn ? "Logged In" : "Not Logged In"}</strong>
          </span>
          {user && (
            <span className="text-sm">
              User: <strong>{user.name}</strong> ({user.type})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {user && (
            <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
              ID: {user.id}
            </span>
          )}
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
          >
            Clear Session
          </button>
        </div>
      </div>
    </header>
  );
}
