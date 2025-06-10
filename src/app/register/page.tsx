"use client";

import React from "react";
import Link from "next/link";

const Register= () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2 text-primary">Register</h2>
                <p className="text-sm text-secondary text-center mb-6 mt-0">And be a part of the Adira family!</p>

                <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
            </div>
        </div>
    )
};

export default Register;