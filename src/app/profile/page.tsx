export default function GuestUserProfile() {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-20">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center space-y-6">
        <h2 className="text-2xl font-bold text-[#22577A]">Guest Access</h2>
        <p className="text-gray-700">
          You’re currently browsing as a guest. To claim items, chat with users,
          or post listings, please sign up or log in.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-[#22577A] hover:bg-[#38A3A5] text-white font-semibold py-2 px-6 rounded"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
