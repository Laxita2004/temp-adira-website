"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResendVerification = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to resend email");
      } else {
        setMessage("Verification email sent successfully");
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">

        {/* NEW USER */}
        {!status && type === "new" && (
          <>
            <h1 className="text-2xl font-bold text-primary mb-4">
              Verify Your Email
            </h1>

            <p className="text-gray-600 mb-2">
              We have sent a verification link to:
            </p>

            <p className="font-semibold text-black break-all mb-6">
              {email}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Please check your inbox and click the verification
              link to activate your account.
            </p>

            <p className="text-sm text-gray-500">
              The verification link will expire in 10 minutes.
            </p>
          </>
        )}

        {/* EXISTING UNVERIFIED USER */}
        {!status && type === "existing" && (
          <>
            <h1 className="text-2xl font-bold text-primary mb-4">
              Email Verification Pending
            </h1>

            <p className="text-gray-600 mb-2">
              An account with this email already exists but has not
              been verified yet.
            </p>

            <p className="font-semibold text-black break-all mb-6">
              {email}
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Please check your inbox and verify your email to
              continue.
            </p>

            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Resend Verification Email"}
            </button>
          </>
        )}

        {/* EXPIRED TOKEN */}
        {status === "expired" && (
          <>
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">
              Verification Link Expired
            </h1>

            <p className="text-gray-600 mb-6">
              Your verification link has expired.
              Please request a new verification email.
            </p>

            {email && (
              <p className="text-sm text-gray-500 mb-6 break-all">
                {email}
              </p>
            )}

            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Resend Verification Email"}
            </button>
          </>
        )}

        {/* FAILED VERIFICATION */}
        {status === "failed" && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h1>

            <p className="text-gray-600 mb-6">
              This verification link is invalid.
            </p>

            {email && (
              <>
                <p className="text-sm text-gray-500 mb-4 break-all">
                  {email}
                </p>

                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {loading
                    ? "Sending..."
                    : "Resend Verification Email"}
                </button>
              </>
            )}
          </>
        )}

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}

        {/* LOGIN */}
        <Link
          href="/login"
          className="inline-block mt-8 text-primary hover:underline"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;