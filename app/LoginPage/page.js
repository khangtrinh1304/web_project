"use client";

import React from "react";
import { useUserAuth } from "../_utils/auth-context";
import Image from "next/image";
import GitHubLogo from "../logo/GitHubLogo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { user, gitHubSignIn, logout } = useUserAuth();

  // user is an object with the following properties:
  // displayName, email, emailVerified, photoURL, uid, phoneNumber, providerData
  async function handleSignIn() {
    try {
      await gitHubSignIn();
      console.log(user);
      router.replace("TaskPage");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await gitHubSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Link href="./LoginPage">
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 bg-[#DC8686] text-white p-2 rounded-md hover:bg-[#bf7676]"
        >
          ← Back To Main Page
        </button>
      </Link>

      <div className="w-full max-w-sm">
        <h1
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#4a5568" }}
        >
          SIMPLETASK
        </h1>
        <div className="space-y-6">
          {/* <div>
            <label
              htmlFor="username"
              className="text-sm font-bold text-gray-600 block"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-2 border border-[#DC8686] rounded-md text-gray-600"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-[#DC8686] rounded-md text-gray-600"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full py-2 px-4 bg-[#DC8686] text-white rounded-md font-bold hover:bg-[#bf7676] transition duration-300">
            Log In
          </button> */}
          {/* <button
          onClick={handleSignOut}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2">
              <Image src={GoogleLogo} alt="Google logo" width={30} height={30} />
            </span>
            Continue with Google
          </button> */}
          <button
            onClick={handleSignIn}
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md font-bold hover:bg-gray-700 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2">
              <Image
                src={GitHubLogo}
                alt="GitHub Logo"
                width={30}
                height={30}
              />
            </span>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
