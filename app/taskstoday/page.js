'use client';
import TasksToday from "../components/tasksToday";
import Link from "next/link";
import MyProfile from "../components/button/buttonProfile";
import ButtonAddTask from "../components/button/buttonAddTask";
import Head from 'next/head'; // Import Head component from next/head
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks

export default function PageTaskToday(){
    const [pageTitle, setPageTitle] = useState('Listy | Tasks Today'); // State to manage page title

    useEffect(() => {
        // Effect to update document title whenever pageTitle changes
        document.title = pageTitle;
    }, [pageTitle]);

    return(
        <div>
            <Head>
                <title>{pageTitle}</title> {/* Set the title dynamically */}
            </Head>

            <div className=" grid grid-cols-3 sm:gap-1 gap-2">
                <div className=" sm:col-span-1 md:col-span-1  bg-gray-800 text-center min-h-screen text-white">
                    <h1 className="py-5 text-lg"> Tasks Today</h1>
                    <button className=" block w-full m-2 hover:text-blue-400  text-gray-400">
                        <Link href='/upcomingtasks'> Upcoming Tasks</Link>
                    </button>
                    <button className=" block w-full m-2 hover:text-blue-400 text-gray-400 ">
                        <Link href='/dashboard'> Back to Dashboard </Link>
                    </button>
                </div>
                <div className=" col-span-2 p-5 ">
                    <div className="text-lg  flex justify-end hover:text-blue-400 gap-2 ">
                        <MyProfile />
                    </div>
                    <div className='mt-8 p-4'>
                        <TasksToday />
                    </div>
                </div>
            </div>

            <ButtonAddTask/>
        </div>
    );
}
