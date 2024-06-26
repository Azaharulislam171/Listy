// components/SignIn.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import ButtonSigninWithGoogle from './button/buttonSignInWithGoogle';
import ForgotPassword from './forgotPassword'; // Adjust the path as needed

const SignIn = ({ setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-8 w-full">
      {!showForgotPassword ? (
        <>
          <h2 className="text-2xl font-bold mb-8 text-blue-500 mb-48">Sign In</h2>
          <form onSubmit={handleSignIn} className="w-full max-w-md bg-transparent rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full shadow-lg px-3 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full text-gray-700 shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-white text-small rounded-md">
                <button
                  type="submit"
                  className="mb-4 w-64 py-2 px-6 bg-blue-500 text-white text-center font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
              <div className="bg-black w-64 text-white text-center text-small py-2 px-6 rounded-md">
                <ButtonSigninWithGoogle />
              </div>
            </div>
          </form>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mt-24">
              Forgot your password?{' '}
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </button>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setShowSignup(true)}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </>
      ) : (
        <ForgotPassword setShowSignIn={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default SignIn;
