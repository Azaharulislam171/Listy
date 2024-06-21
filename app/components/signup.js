import React, { useState } from 'react';
import { auth, db, storage } from '../../firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import ButtonSigninWithGoogle from './button/buttonSignInWithGoogle';

const Signup = ({ setShowSignin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

  
    const validatePassword = (password) => {
      // Password must be at least 8 characters long, contain an uppercase letter, and a special character
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
      return passwordRegex.test(password);
    };
  
    const handleSignup = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long, contain an uppercase letter, and a special character');
        return;
      }
  
      setError('');
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        let profilePhotoURL = '';
        if (profilePhoto) {
          const storageRef = ref(storage, `profilePhotos/${user.uid}/${profilePhoto.name}`);
          const snapshot = await uploadBytes(storageRef, profilePhoto);
          profilePhotoURL = await getDownloadURL(snapshot.ref);
        }
  
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          profilePhoto: profilePhotoURL,
          email: user.email,
          createdAt: serverTimestamp(),
        });
  
        alert('User signed up successfully!');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up: ' + error.message);
      }
    };

    const backtoHome=()=>{
    router.push('/dashboard')
    }
  
    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setProfilePhoto(e.target.files[0]);
      }
    };
  
    
  
    return (
      <div className="flex flex-col items-center justify-between py-8 w-full">
        <h2 className="text-2xl font-bold mb-8  text-blue-500">Sign Up</h2>
        <form onSubmit={handleSignup} className="w-full max-w-md bg-transparent rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePhoto" className="block text-gray-700 text-sm font-bold mb-2">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              onChange={handleFileChange}
              placeholder="Profile Photo"
              accept="image/*"
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full shadow-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
       
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={backtoHome}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    );
  };
  
  export default Signup;
