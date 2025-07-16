export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Sign Up</h1>
        <p className="text-blue-600 mb-6">Create your account to get started</p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-blue-800">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-blue-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </div>
    </main>
  );
}
