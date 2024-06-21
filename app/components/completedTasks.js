import { useEffect, useState } from 'react';
import { db, auth, Timestamp } from '../../firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { CheckCircleIcon, DocumentTextIcon, TrashIcon } from '@heroicons/react/24/solid';

const CompletedTasks = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTasks = async (uid, date) => {
      const fixedDate = new Date(date);
      const startOfDayTimestamp = Timestamp.fromDate(new Date(fixedDate.setUTCHours(0, 0, 0, 0)));
      const endOfDayTimestamp = Timestamp.fromDate(new Date(fixedDate.setUTCHours(23, 59, 59, 999)));

      const q = query(
        collection(db, 'tasks', uid, 'userTasks'),
        where('taskDue', '<', startOfDayTimestamp),
        where('completed', '==', true)
      );

      const querySnapshot = await getDocs(q);
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        taskStartDate: doc.data().taskStartDate.toDate(),
        taskDue: doc.data().taskDue.toDate(),
      }));

      setTasks(taskList);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTasks(user.uid, selectedDate);
      } else {
        setUserId(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [selectedDate]);

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

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the Task?`);
    if (!confirmDelete) {
      return; // Cancel deletion if user cancels
    }
    try {
      await deleteDoc(doc(db, 'tasks', userId, 'userTasks', taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const displayNote = (note) => {
    alert(note);
  };

  return (
    <div>
      
      <div className="overflow-x-auto">
        {tasks.length > 0 ? (
          <div className="min-w-full bg-white overflow-hidden shadow-md rounded-lg">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="sr-only">Action</span>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Label
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Start Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task) => (
                          <tr key={task.id}>
                            <td className="px-6 py-2 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                                <button
                                  onClick={() => toggleCompletion(task.id, task.completed)}
                                  className={`p-1 rounded-full `}
                                >
                                  <CheckCircleIcon className={`w-6 h-6 ${task.completed ? 'text-lime-400' : 'text-gray-400'}`} />
                                </button>
                                <button
                                  onClick={() => deleteTask(task.id)}
                                  className="text-white rounded-full"
                                >
                                  <TrashIcon className='w-5 h-5 text-gray-600' />
                                </button>
                                <button
                                  className="text-white rounded-full"
                                  onClick={() => displayNote(task.taskNote)}
                                >
                                  <DocumentTextIcon className='w-5 h-5 text-gray-600' />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 whitespace-nowrap text-sm text-gray-900">
                              <div className="bg-slate-50 rounded-lg px-4 py-2">{task.task}</div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{task.taskLabel}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                              <div className="bg-slate-50 rounded-lg px-4 py-2">{task.taskPriority}</div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{task.taskStartDate.toLocaleString()}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{task.taskDue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No tasks listed for today</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
