//route "/login"
"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/profile");
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6 ">
        {/* Login Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-12 rounded-lg shadow-md w-full max-w-md space-y-8"
        >
          {/* Form Title */}
          <h2 className="text-2xl font-bold text-center">Log In</h2>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="(temporarily optional)"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="(temporarily optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#22577A] hover:bg-[#38A3A5] text-white font-semibold p-2 rounded cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
