'use client';

import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.username, password: form.password })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message || "Login successful!");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
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
