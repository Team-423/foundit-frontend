"use client";

import { useRouter } from "next/navigation";
import { MOCK_USERS, useUser } from "../../contexts/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = (userType: "alice" | "bob" | "guest") => {
    if (userType === "alice") {
      setUser(MOCK_USERS.alice);
      router.push("/profile/6848dbfff00779a4e05a3e4b");
    } else if (userType === "bob") {
      setUser(MOCK_USERS.bob);
      router.push("/profile/6848dbfff00779a4e05a3e4c");
    } else if (userType === "guest") {
      setUser(MOCK_USERS.guest);
      router.push("/");
    }
  };

  return (
    <main className="relative min-h-screen flex items-start justify-center bg-gray-100 p-6">
      {/* Debug Info in Top-Right */}

      <section className="w-full max-w-md">
        {/* Login Form Container */}
        <section className="bg-white p-12 rounded-lg shadow-md space-y-8">
          {/* Form Title & Quick Login */}
          <header className="flex items-center mb-6">
            <button
              onClick={() => handleLogin("alice")}
              className="w-24 h-20 bg-[#22577A] hover:bg-[#38A3A5] text-white font-semibold p-2 rounded-4xl"
            >
              Seeker (Alice)
            </button>

            <h2 className="text-2xl font-bold text-center flex-grow text-[#22577A]">
              Log In
            </h2>

            <button
              onClick={() => handleLogin("bob")}
              className="w-24 h-20 bg-[#38A3A5] hover:bg-[#22577A] text-white font-semibold p-2 rounded-4xl"
            >
              Finder (Bob)
            </button>
          </header>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="(temporarily optional)"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="password" className="block font-medium mb-1">
                Password:
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="(temporarily optional)"
              />
            </fieldset>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleLogin("guest")}
                className="w-full bg-[#168aad] hover:bg-[#1e6091] text-white font-semibold p-2 rounded"
              >
                Log In
              </button>

              <button
                onClick={() => handleLogin("guest")}
                className="w-full bg-[#98a4ac] hover:bg-[#18232b] text-white font-semibold p-2 rounded"
              >
                Continue as Guest
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
