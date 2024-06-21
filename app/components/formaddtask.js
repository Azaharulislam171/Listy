import { useState, useEffect } from "react";
import { db, Timestamp } from "../../firebase"; // Import Timestamp from firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const ButtonAddTask = ({ user }) => {
  const [newTask, setNewTask] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskPriority, setTaskPriority] = useState("High"); // Default priority
  const [taskLabel, setTaskLabel] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [labels, setLabels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLabels = async () => {
      if (user) {
        try {
          const labelsCollection = collection(db, "tasks", user.uid, "userLabels");
          const labelSnapshot = await getDocs(labelsCollection);
          const labelList = labelSnapshot.docs.map(doc => doc.data().label);
          setLabels([...new Set(labelList)]);
        } catch (error) {
          console.error("Error fetching labels: ", error);
        }
      }
    };

    fetchLabels();
  }, [user]);

  const handleAddTask = async () => {
    setErrorMessage("");

    // Check if any required fields are empty
    if (!newTask || !taskStartDate || !taskDue || !taskLabel || !taskNote) {
      setErrorMessage("One or more fields are empty. Task not added.");
      return;
    }

    try {
      // Convert taskStartDate and taskDue to Firestore Timestamps
      const startDateTimestamp = Timestamp.fromDate(new Date(taskStartDate));
      const dueTimestamp = Timestamp.fromDate(new Date(taskDue));

      // Add task to Firestore
      await addDoc(collection(db, "tasks", user.uid, "userTasks"), {
        task: newTask,
        completed: false,
        taskStartDate: startDateTimestamp,
        taskDue: dueTimestamp,
        taskPriority,
        taskLabel,
        taskNote,
      });

      console.log("Task added successfully!");

      // Redirect to dashboard after adding task
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding task: ", error);
      setErrorMessage("Failed to add task. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add a Task</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="border text-gray-500 p-2 rounded w-full mb-4"
        placeholder="Enter task"
      />
      <input
        type="datetime-local"
        value={taskStartDate}
        onChange={(e) => setTaskStartDate(e.target.value)}
        className="border p-2 text-gray-500 rounded w-full mb-4"
        placeholder="Task start date"
      />
      <input
        type="datetime-local"
        value={taskDue}
        onChange={(e) => setTaskDue(e.target.value)}
        className="border p-2 text-gray-500 rounded w-full mb-4"
        placeholder="Task due date"
      />
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
        className="border p-2 text-gray-500 rounded w-full mb-4"
      >
        <option value="High">High</option>
        <option value="Moderate">Moderate</option>
        <option value="Low">Low</option>
      </select>
      <select
        value={taskLabel}
        onChange={(e) => setTaskLabel(e.target.value)}
        className="border p-2 rounded w-full mb-4 text-gray-400"
      >
        <option value="" disabled>Select a label</option>
        {labels.map((label, index) => (
          <option key={index} value={label}>{label}</option>
        ))}
      </select>
      <textarea
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
        className="border p-2 rounded w-full mb-4 text-gray-500"
        placeholder="Task notes"
      />
      <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </div>
  );
};

export default ButtonAddTask;
