'use client';

import { useState } from "react";
import { login } from "../../apicalls/services/user";
import { useToast } from "../ui/Toaster";
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { setUser } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { success, user } = await login(form.username, form.password);
      if (!success) {
        showToast("Login failed.", "error");
        return;
      }
      setUser(user);
      showToast("Login successful!", "success");
      router.push('/dashboard');
    } catch (err) {
      showToast(`An error occurred. Please try again. ${err}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium text-blue-800">Email</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your email"
          value={form.username}
          onChange={handleChange}
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="username"
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
          value={form.password}
          onChange={handleChange}
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="current-password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
