
import EditLabel from "../components/editLabel";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Link from 'next/link';


export default function Sidebar(){
    const [user, setUser] = useState(null); 
    const [selectedDate, setSelectedDate] = useState(new Date());


    const handleClickAddTask = () => {
        router.push('/addtask');
      };
    
      const handleLabelClick = (label) => {
        setSelectedLabel(label);
      };


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

    return(
        <div>
            <div className="w-1/5 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-8 flex items-center">
          <span className="ml-4 text-sm md:text-lg font-semibold">
            <button>
              <Link href="/taskstoday" >  Tasks Today </Link>
             
            </button>
          </span>
        </div>
        <nav className="mb-8">
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white text-sm md:text-lg">Tasks Today</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white text-sm md:text-lg">Upcoming Tasks</a>
            </li>
          </ul>
        </nav>
        <div className="mb-8">
          <h2 className="mb-2 text-sm text-gray-400">Your Labels</h2>
          <EditLabel user={user} onLabelClick={handleLabelClick} />
        </div>
        <div>
          <h2 className="mb-2 text-sm text-gray-400">Choose a date</h2>
          <div className="bg-gray-700 p-2 rounded-md">
            <div className="text-center text-gray-400 mb-2">
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border rounded p-2 sm:w-24 md:w-36 lg:w-48"
          />
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}