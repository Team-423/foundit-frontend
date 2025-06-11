export default function GuestUserProfile() {
  return (
    // Full height & width with background to fill the screen space inside main
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full p-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Guest Access</h2>
        <p className="text-gray-700">
          Hi there! You’re currently browsing as a guest. To claim items, chat
          with users, post listings, and more, please sign up or log in.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded"
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
