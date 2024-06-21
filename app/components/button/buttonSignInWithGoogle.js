// app/components/button/buttonSignInWithGoogle.js
import React from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase";
import Image from "next/image";

const ButtonSigninWithGoogle = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard or another page after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button onClick={handleSignIn} className=" flex gap-5">
      <span>
      <Image 
      src="/g.png" 
      alt=" Sign in with Google" 
      width={20} 
      height={20} />
      </span>
      <span>|Sign in with Google</span>
    </button>
  );
};

export default ButtonSigninWithGoogle;
