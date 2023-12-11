"use client";
import React from "react";
import Image from "next/image";
import { useUserAuth } from "../_utils/auth-context";
import { useState } from "react";
import { addUser } from "../_services/logInServices";
import AlertDialog from "./AlertDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GitHubLogo from "../logo/GitHubLogo.png";


export default function SignUpPage() {
  const router = useRouter();
  const { user, gitHubSignIn, gitHubSignOut } = useUserAuth();
  const [fullName, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(true);

  async function handleSignIn() {
    try {
      await gitHubSignIn();
      setErrorDialogOpen(false)
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }


  const handleSetFullName = (event) => {
    setName(event.target.value);
  };
  const handleSetUsername = (event) => {
    setUserName(event.target.value);
  };
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const newItem = {
    fullName: fullName,
    userName: userName,
    password: password,
  };

  const handleSignUp = () => {
    if (user) {
      addUser(newItem, user.uid);
      console.log("addUser", user.uid);
      setDialogOpen(true);
    } else {
      console.log("fail");
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create New Account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="full-name"
              className="text-sm font-bold text-gray-600 block"
            >
              Your Full Name
            </label>
            <input
              value={fullName}
              onChange={handleSetFullName}
              id="full-name"
              type="text"
              placeholder="Enter Your Name Here"
              className="w-full p-2 border border-[#DC8686] rounded-md text-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-bold text-gray-600 block"
            >
              Username
            </label>
            <input
              value={userName}
              onChange={handleSetUsername}
              id="username"
              type="text"
              placeholder="Enter Your Email Here"
              className="w-full p-2 border border-[#DC8686] rounded-md text-gray-600"
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
              value={password}
              onChange={handleSetPassword}
              id="password"
              type="password"
              placeholder="Enter Your Password Here"
              className="w-full p-2 border border-[#DC8686] rounded-md text-gray-600"
            />
          </div>
        </form>
        <button
          onClick={handleSignUp}
          className="mt-2  w-full py-2 px-4 bg-[#DC8686] text-white rounded-md font-bold hover:bg-[#bf7676]"
        >
          Sign Up
        </button>
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        content={"Congratulation! You signed up successfully!"}
      />
       <div
        className="flex items-center justify-center"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '40px', // Increased padding for a larger size
        background: '#F0F0F0', // Changed background color
        borderRadius: '12px', // Increased border radius
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)', // Adjusted box shadow
        display: isErrorDialogOpen ? 'block' : 'none',
      }}
    >
      <p className='text-black'>{
        <div className="p-4 ">
          <p className="mb-3">Please sign in with your GitHub before sign up!</p>
 <button
       onClick={handleSignIn}
       className="w-full py-2 px-4 bg-gray-600 text-white rounded-md font-bold hover:bg-gray-700 transition duration-300 flex items-center justify-center"
     >
       <span className="mr-2">
         <Image
           src={GitHubLogo}
           alt="GitHub Logo"
           width={60}
           height={60}
         />
       </span>
       Continue with GitHub
     </button>
     
        </div>
      
      }</p></div>
    </div>
  );
}
