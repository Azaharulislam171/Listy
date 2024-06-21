import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function ButtonSignOut(){
    const router=useRouter();
    const handleSignOut = async () => {
        try {
          await auth.signOut();
          router.push('/');
          // You may optionally redirect here or handle in PageAddTask
        } catch (error) {
          console.error('Error signing out:', error);
          // Handle error signing out
        }
      };
    
    return(
        <button onClick={handleSignOut} >
              Sign Out
            </button>
    );
}