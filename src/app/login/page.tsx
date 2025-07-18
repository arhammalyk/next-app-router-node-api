export const dynamic = "force-dynamic";

import LoginForm from "../../components/auth/LoginForm";

export default async function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Login</h1>
        <p className="text-blue-600 mb-6">Sign in to your account to continue</p>
        <LoginForm />

      </div>
    </main>
  );
}
