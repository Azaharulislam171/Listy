'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import to 'next/router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import ButtonSigninWithGoogle from '../app/components/button/buttonSignInWithGoogle';
import Signup from '../app/components/signup';
import SignIn from '../app/components/signin';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        router.push('/dashboard');
      } else {
        console.log('User is signed out');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen">
      
      <div className="hidden md:flex md:w-1/2 bg-gray-800 items-center justify-center">
        <div className="text-gray-300 text-9xl">
          <Image
            src="/ai.png"
            alt="Description of the image"
            width={500}
            height={300}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center">
        {showSignup ? (
          <Signup setShowSignin={setShowSignin} />
        ) : showSignin ? (
          <SignIn setShowSignup={setShowSignup} />
        ) : (
          <>
            <div className="absolute top-24 rounded-full p-4 ">
              
              <Image
              src="/t.png"
              alt="Description of the image"
              width={100}
              height={200}
              className="rounded-md"
            />
            </div>
            <button
              className="border-black border-2  w-64 hover:text-white hover:bg-black   text-small py-2 px-6 mb-4 rounded-full "
              onClick={() => setShowSignup(true)}
            >
              Sign up with Email
            </button>
            <button
              className="border-black border-2  w-64 hover:text-white hover:bg-black text-small py-2 px-6 mb-4 rounded-full"
              onClick={() => setShowSignin(true)}
            >
              Sign in with Email
            </button>
            <div className="border-black border-2  w-64 hover:text-white hover:bg-black text-small py-2 px-6 rounded-full">
              <ButtonSigninWithGoogle />
            </div>
            <p className=" absolute bottom-10 text-gray-600 text-sm text-center">
              By clicking continue, you agree to our{' '}
              <a href="/terms-of-service" className="underline text-bold">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/terms-of-service" className="underline">
                Privacy Policy
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
