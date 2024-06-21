// pages/index.js
'use client'

import Head from 'next/head';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import TasksToday from '../components/tasksToday';
import UpcomingTasks from '../components/upcomingTasks';
import CompletedTasks from '../components/completedTasks';
import PastDueTasks from '../components/pastDueTasks';
import MyProfile from '../components/button/buttonProfile';
import Search from '../components/search';
import CalendarComponent from '../components/testCalendar';
import EditLabel from '../components/editLabel';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function TestDashboard() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLabel, setSelectedLabel] = useState('');
  const [initialLabelSet, setInitialLabelSet] = useState(false); // New state to track if the initial label is set
  const [user, setUser] = useState(null); 

  const handleClickAddTask = () => {
    router.push('/addtask');
  };

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

  const setInitialLabel = (label) => {
    if (!initialLabelSet) { // Only set the initial label if it hasn't been set before
      setSelectedLabel(label);
      setInitialLabelSet(true);
    }
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
 

  return (
    <div className="flex h-screen overflow-hidden">
      <Head>
        <title>Dashboard with Test</title>
      </Head>
      {/* Sidebar */}
      <div className=" sm: w-1/3 md:w-1/5 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-8 flex items-center">
          <span className="ml-4 text-sm md:text-lg font-semibold">
            <button>
              <Link href="#" >  Dashboard </Link>
             
            </button>
          </span>
        </div>
        <nav className="mb-8">
          <ul>
            <li className="mb-4">
              <a href="/taskstoday" className="text-gray-300 hover:text-blue-500 text-sm md:text-lg">Tasks Today</a>
            </li>
            <li className="mb-4">
              <a href="/upcomingtasks" className="text-gray-300 hover:text-blue-500 text-sm md:text-lg">Upcoming Tasks</a>
            </li>
          </ul>
        </nav>
        <div className="mb-8">
          <h2 className="mb-2 text-sm text-gray-400">Your Labels</h2>
          <EditLabel user={user} onLabelClick={handleLabelClick} setInitialLabel={setInitialLabel} />
        </div>
        <div>
          <h2 className="mb-2 text-sm text-gray-400">Choose a date</h2>
          <div className="bg-gray-700 text-center text-gray-900 p-2 rounded-md">
            
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="border rounded p-2 sm:w-24 md:w-36 lg:w-48"
          />
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="main-content" className=" flex-1 p-4 overflow-y-auto ">
        <div className="grid grid-cols-4 md:grid-cols-12 lg:grid-cols-12 gap-4 overflow-y-auto">
          <div className="col-span-12 md:col-span-12">
            <div className="text-lg font-semibold flex justify-end hover:text-blue-400 gap-2">
              <MyProfile />
            </div>
          </div>
          {/* Task's Today */}
          <div className="col-span-12 md:col-span-6 p-2 rounded-lg shadow-xl  bg-white max-h-64 overflow-y-auto">
            <h2 className=" text-md font-semibold text-gray-400 mb-2">Tasks Today</h2>
            <div className="overflow-y-auto min-h-48  rounded shadow-xl ">
              <TasksToday />
            </div>
          </div>
          {/* Upcoming Tasks */}
          <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <h2 className="text-md  text-gray-400 font-semibold mb-4">Upcoming Tasks</h2>
            <div className=" text-gray-400 min-h-48 rounded shadow-l">
              <UpcomingTasks />
            </div>
          </div>

          <div className="col-span-12  bg-white p-4 rounded-lg shadow lg:min-h-64 overflow-y-auto">
            <h2 className="text-md  text-gray-400 font-semibold mb-4">{selectedLabel}</h2>
            <Search label={selectedLabel} />
          </div>


          {/* Completed Tasks */}
          <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow-xl md:min-h-32 overflow-y-auto">
            <h2 className="text-md  text-gray-400 font-semibold mb-4">Tasks completed till {selectedDate.toLocaleDateString()}</h2>
            <div className=" text-gray-400 min-h-48 rounded shadow-xl">
            <CompletedTasks  selectedDate={selectedDate}/>
            </div>
          </div>
          {/* Past Due Tasks */}
          <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-lg shadow-xl lg:min-h-32 overflow-y-auto">
            <h2 className="text-sm  text-gray-400 font-semibold mb-4">Tasks past due till {selectedDate.toLocaleDateString()}</h2>
            <PastDueTasks selectedDate={selectedDate} />
          </div>

          

         
        </div>
      </div>


      {/* Floating Action Button */}
      <button className="fixed bottom-4 right-4 w-16 h-16" onClick={handleClickAddTask}>
        <PlusCircleIcon className='text-blue-500' />
      </button>
    </div>
  );
}
