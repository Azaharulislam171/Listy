import React, { useEffect, useState } from 'react';
import { db, auth, Timestamp } from '../../firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Search = ({ label }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTasks = async (uid) => {
      try {
        const q = query(
          collection(db, 'tasks', uid, 'userTasks'),
          where('taskLabel', '==', label)
        );

        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          taskStartDate: doc.data().taskStartDate.toDate(), // Convert Firestore Timestamp to Date
          taskDue: doc.data().taskDue.toDate(), // Convert Firestore Timestamp to Date
        }));

        setTasks(taskList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTasks(user.uid);
      } else {
        setUserId(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [label]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="bg-pink-200 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{task.task}</h2>
            <p className="text-gray-500 mb-2">{task.taskNote}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">{task.taskLabel}</p>
              <p className="text-sm text-gray-400">{task.taskPriority}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-400">Start Date: {task.taskStartDate.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Due Date: {task.taskDue.toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found with label "{label}"</p>
      )}
    </div>
  );
};

export default Search;
