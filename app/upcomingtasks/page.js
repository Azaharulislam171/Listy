"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import UpcomingTasks from "../components/upcomingTasks";
import MyProfile from "../components/button/buttonProfile";
import ButtonAddTask from "../components/button/buttonAddTask";


export default function PageUpcomingTask(){
  const [pageTitle, setPageTitle] = useState('Listy | Upcoming Task');
    useEffect(() => {
        // Effect to update document title whenever pageTitle changes
        document.title = pageTitle;
    }, [pageTitle]);
 
    return(
        <div>
            <div className=" grid grid-cols-3 sm:gap-1 gap-2">
            <div className=" sm:col-span-1 md:col-span-1  bg-gray-800 text-center min-h-screen text-white">
              <h1 className="py-5 text-lg "> Upcoming Tasks </h1>
              <div className=""> 
                <button className="block w-full  m-2 hover:text-blue-400 text-gray-400">
                <Link href='/taskstoday'> Tasks Today </Link>
              </button> 
              <button className="block w-full m-2 text-center hover:text-blue-400 text-gray-400">
                <Link href="/dashboard"> Back to Dashboard </Link>
              </button>
              </div>
              
            
            </div>
            <div className=" col-span-2 p-5 ">
            <div className="text-lg  flex justify-end hover:text-blue-400 gap-2 ">
              <MyProfile />
            </div>
                 
                  <div className='mt-8 p-4'>
                  <UpcomingTasks />
                  </div>
               
            </div>
            <ButtonAddTask/>
            </div>
        </div>
    );
}