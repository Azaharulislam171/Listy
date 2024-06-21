'use client';
import { useEffect, useState } from 'react';
import ButtonAddTask from '../components/formaddtask';
import MyProfile from '../components/button/buttonProfile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function PageAddTask() {
  const [user, setUser] = useState(null);
  const [pageTitle, setPageTitle] = useState('Listy | Add Task');

  useEffect(() => {
    const auth = getAuth();
    document.title = pageTitle;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Handle the case when the user is not authenticated
        console.log("User is not authenticated");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="text-lg  flex justify-end hover:text-blue-400 gap-2 ">
              <MyProfile />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-full max-w-4xl shadow-md rounded-lg p-2 md:p-8">
          <Link href='/test'>
            <XCircleIcon className='text-gray-500 w-12 h-12 absolute top-2 right-2' />
          </Link>
          {user ? <ButtonAddTask user={user} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
