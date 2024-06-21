import React, { useState, useEffect } from 'react';
import EditLabel from './editLabel';
import Search from './Search';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const TaskManager = () => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

  return (
    <div className="p-4">
      {user ? (
        <>
          <EditLabel user={user} onLabelClick={handleLabelClick} />
          <Search label={selectedLabel} />
        </>
      ) : (
        <p className="text-center text-gray-500">Please log in to manage tasks.</p>
      )}
    </div>
  );
};

export default TaskManager;
