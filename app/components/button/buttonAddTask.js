
import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
export default function ButtonAddTask(){
    const router = useRouter();
    const handleClickAddTask = () => {
        router.push('/addtask');
      };
    return(
        <div>
            <button className="fixed bottom-4 right-4 w-16 h-16" onClick={handleClickAddTask}>
        <PlusCircleIcon className='text-blue-500  hover:text-blue-800' />
        </button>
        </div>
        
        
    );
}