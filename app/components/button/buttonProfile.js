// components/button/buttonProfile.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../firebase'; // Adjust the path to your Firebase setup
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

export default function MyProfile() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileImage(userData.profilePhoto || user.photoURL);
            setUsername(userData.firstName || user.displayName || 'User');
          } else {
            setProfileImage(user.photoURL);
            setUsername(user.displayName || 'User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // No user is signed in, handle accordingly
        router.push('/'); // Redirect to login or home page
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/'); // Redirect to homepage after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle error signing out
    }
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <div className="flex mr-4 items-center space-x-1 cursor-pointer" onClick={handleToggleDropdown}>
        <span className='mr-4 capitalize'>{username}</span>
        <Image
        src={profileImage} 
        alt="Profile Icon"
        className="mr-4  w-8 h-8 rounded-full"
        />
      </div>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border-gray-300 rounded shadow-lg z-10">
          <button onClick={handleSignOut} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-red-400 w-full text-left">
            Sign Out
          </button>
          <a href="#" className="block px-4 py-2 text-gray-400 hover:text-blue-400">Profile Settings</a>
          <a href="#" className="block px-4 py-2 text-gray-400 hover:text-blue-400">Theme</a>
        </div>
      )}
      {dropdownOpen && (
        <div
          className="fixed top-0 left-0 z-0 w-screen h-screen bg-white opacity-90 backdrop-blur-xl"
          onClick={handleToggleDropdown}
        />
      )}
    </div>
  );
}
