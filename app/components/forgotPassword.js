// components/ForgotPassword.js
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ForgotPassword = ({ setShowSignIn }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full">
      <h2 className="text-2xl font-bold mb-8 text-blue-500">Forgot Password</h2>
      {!emailSent ? (
        <form onSubmit={handleResetPassword} className="w-full max-w-md bg-transparent rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Password
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      ) : (
        <p className="text-green-500">Password reset email sent to {email}. Check your inbox.</p>
      )}
      <button
        onClick={() => setShowSignIn(true)}
        className="mt-4 text-blue-500 hover:underline"
      >
        Back to Sign In
      </button>
    </div>
  );
};

export default ForgotPassword;
