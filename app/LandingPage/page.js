"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const { user, gitHubSignIn, logout } = useUserAuth();

  useEffect(() => {
    if (user) {
      router.replace(`/TaskPage`);
    }
  }, [user]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24 "
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <h1
        className="text-4xl font-bold text-center mb-12"
        style={{ color: "#4a5568" }}
      >
        Manage your To Do tasks with SIMPLETASK
      </h1>
      <div className="flex flex-col space-y-6 w-full max-w-sm">
        <button
          onClick={() => router.push(`/LoginPage`)}
          className="w-full py-2 px-4 bg-[#DC8686] text-white rounded-md text-lg font-bold hover:bg-[#bf7676] transition duration-300"
        >
          Log In
        </button>
        <button
          onClick={() => router.push(`/SignUpPage`)}
          className="w-full py-2 px-4 bg-[#DC8686] text-white rounded-md text-lg font-bold hover:bg-[#bf7676] transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
