"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // Error case
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (data.type === "existing") {
        router.push(
          `/verify-email?email=${encodeURIComponent(form.email)}&type=existing`,
        );

        return;
      }

      // Normal registration flow
      router.push(
        `/verify-email?email=${encodeURIComponent(form.email)}&type=new`,
      );
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-primary">
          Register
        </h2>

        <p className="text-sm text-secondary text-center mb-6">
          And be a part of the RATNAWAD family!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-gray-600 block mb-1 text-sm font-medium">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 block mb-1 text-sm font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          {/* Password */}
          <div>
            <label className="text-gray-600 block mb-1 text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-2 pr-12"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
