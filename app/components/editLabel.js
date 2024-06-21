import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { XCircleIcon } from "@heroicons/react/24/solid";

const EditLabel = ({ user, onLabelClick, setInitialLabel }) => {
  const [labeltitle, setlabeltitle] = useState("");
  const [labelcolor, setlabelcolor] = useState("#000000"); // Default color set to black
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [labels, setLabels] = useState([]); // State to store labels and colors

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const labelsCollection = collection(db, "tasks", user.uid, "userLabels");
        const labelSnapshot = await getDocs(labelsCollection);
        const labelList = labelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLabels(labelList);
        if (labelList.length > 0) {
          setInitialLabel(labelList[0].label); // Set the first label as the initial label
        }
      } catch (error) {
        console.error("Error fetching labels: ", error);
      }
    };

    if (user) {
      fetchLabels();
    }
  }, [user, setInitialLabel]);

  const handleAddLabel = async () => {
    // Reset error message
    setErrorMessage("");

    // Check if any of the required fields are empty
    if (!labeltitle || !labelcolor) {
      setErrorMessage("One or more fields are empty. Label not added.");
      return;
    }

    // Check for duplicate labels
    const labelExists = labels.some(label => label.label === labeltitle);
    if (labelExists) {
      setErrorMessage("Label already exists. Please choose a different label.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks", user.uid, "userLabels"), {
        label: labeltitle,
        labelcolor: labelcolor,
      });

      // Optionally, you can show a success message here
      console.log("Label added successfully!");
      
      // Refresh labels after adding a new one
      const labelsCollection = collection(db, "tasks", user.uid, "userLabels");
      const labelSnapshot = await getDocs(labelsCollection);
      const labelList = labelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLabels(labelList);

      // Clear input fields
      setlabeltitle("");
      setlabelcolor("#000000"); // Reset to default color

    } catch (error) {
      console.error("Error adding label: ", error);
      setErrorMessage("Failed to add label. Please try again later.");
    }
  };

  const handleDeleteLabel = async (id, labelName) => {
    // Confirm deletion with user
    const confirmDelete = window.confirm(`Are you sure you want to delete the label "${labelName}"?`);
    if (!confirmDelete) {
      return; // Cancel deletion if user cancels
    }

    try {
      await deleteDoc(doc(db, "tasks", user.uid, "userLabels", id));
      console.log("Label deleted successfully!");

      // Update labels state after deletion
      const updatedLabels = labels.filter(label => label.id !== id);
      setLabels(updatedLabels);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting label: ", error);
      setErrorMessage("Failed to delete label. Please try again later.");
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="mt-4">
        <div className="w-full shadow-xl h-48 p-2 overflow-y-auto">
          {labels.map((label) => (
            <div key={label.id} className="flex border-2 items-center justify-between text-sm p-2 mb-2 w-full rounded-lg hover:bg-gray-600" style={{ borderColor: label.labelcolor }}>
              <button className="flex items-center" onClick={() => onLabelClick(label.label)}>
                <span className="ml-2" style={{ color: label.labelcolor }}>{label.label}</span>
              </button>
              <div className="" style={{ borderColor: label.labelcolor }}>
                <button onClick={() => handleDeleteLabel(label.id, label.label)} className="ml-2">
                  <XCircleIcon className="text-red-400 w-5 h-5" style={{ color: label.labelcolor }} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className=" mt-8 shadow-xl backdrop-blur-lg"> 
        <h2 className=" md:text-lg text-gray-400">Add a new label</h2>
        <input
          className="w-full mb-2 p-2 border bg-transparent text-gray-400 border-gray-300 rounded"
          type="text"
          placeholder="Label name"
          value={labeltitle}
          onChange={(e) => setlabeltitle(e.target.value)}
        />
        <span className="flex justify-between">
          <label className="text-gray-400">Choose color:</label>
          <input
            className="w-1/8 mb-2 p-2 border border-gray-300 rounded-full"
            type="color"
            value={labelcolor}
            onChange={(e) => setlabelcolor(e.target.value)}
          />
        </span>
        <div className="flex justify-center">
          <button onClick={handleAddLabel} className="w-1/2 bg-blue-500 text-white py-1 m-2 rounded-xl">Add label</button>
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default EditLabel;
