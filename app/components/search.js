import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs, updateDoc, doc,orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './Search.module.css'; // Import CSS module
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Search = ({ label }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [labelColor, setLabelColor] = useState('#ffffff'); // Default color

  useEffect(() => {
    const fetchTasks = async (uid) => {
      try {
        // Fetch the label color
        const labelDoc = await getDocs(
          query(collection(db, 'tasks', uid, 'userLabels'), where('label', '==', label))
        );
        if (!labelDoc.empty) {
          const labelData = labelDoc.docs[0].data();
          setLabelColor(labelData.labelcolor);
        }

        // Fetch the tasks with the specified label
        const q = query(
          collection(db, 'tasks', uid, 'userTasks'),
          where('taskLabel', '==', label),
          orderBy('taskDue', 'desc')
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

  const toggleCompletion = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', userId, 'userTasks', taskId), {
        completed: !completed,
        
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !completed } : task
        )
      );
      window.location.reload();
    } catch (error) {
      console.error('Error toggling task completion: ', error);
    }
  };

  return (
    <div className="flex  gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={`border ${styles.taskCard}`} style={{ borderColor: labelColor }}>
            <div className="min-w-64  max-w-[400px]  " style={{ borderColor: labelColor }}>
              <div className="grid grid-cols-4 gap-3 p-4">
                <div className="col-span-3">
                  <h2 className="text-lg text-gray-400 font-semibold mb-2" style={{ color: labelColor }}>{task.task}</h2>
                  <p className="text-lg text-gray-400">{task.taskLabel}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => toggleCompletion(task.id, task.completed)}
                    className={`p-1 rounded-full`}
                  >
                    <CheckCircleIcon className={`w-6 h-6 ${task.completed ? 'text-lime-400' : 'text-gray-400'}`} />
                  </button>
                  <p className="text-sm text-gray-400 border-2 rounded-md bg-gray-200 mt-auto px-2 py-1">{task.taskPriority}</p>
                </div>
              </div>
              <hr className={`border-t border-gray-300 ${styles.divider}`} style={{ backgroundColor: labelColor }} />
              <div className="p-4">
                <p className="text-sm text-gray-400">Start Date: {task.taskStartDate.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Due Date: {task.taskDue.toLocaleString()}</p>
              </div>
              <hr className={`border-t border-gray-300 ${styles.divider}`} style={{ backgroundColor: labelColor }} />
              <div className="p-4">
                <p className="text-gray-400 text-sm mb-2">{task.taskNote}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found with label &quot;{label}&quot;. Click on a label to continue</p>
      )}
    </div>
  );
};

export default Search;
