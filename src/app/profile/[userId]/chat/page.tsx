// route "/profile/[userId]/chat"
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "../../../loading";

interface User {
  _id: number;
  username: string;
  email: string;
  img_url: string;
  points: number;
}

export default function ChatPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `https://foundit-backend-dg0o.onrender.com/api/users/${userId}`
      );
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    };

    if (userId) fetchUser();
  }, [userId]);

  if (loading) return <Loading />;
  if (!user) return <div>User not found</div>;

  return (
    <>
      <h1 className="mt-5 text-center text-2xl font-bold">
        This will display {`${user.username}'s`} chat history:
      </h1>
    </>
  );
}
