import { Bell, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import CreateButton from "../Haikus/CreateBtn/CreateButton";

export default function Header() {
   return (
      <header className='bg-white dark:bg-gray-800 shadow-sm'>
         <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link to='/'>
               <h1 className='text-2xl font-semibold text-gray-800 dark:text-white'>
                  HaikuHub
               </h1>
            </Link>
            <nav className='flex items-center space-x-4'>
               <Button variant='ghost' size='icon'>
                  <Bell className='h-5 w-5' />
               </Button>
               <Link to='/me'>
                  <Button variant='ghost' size='icon'>
                     <User className='h-5 w-5' />
                  </Button>
               </Link>
               <Link to='/login'>
                  <Button variant='ghost' size='icon'>
                     <LogIn className='h-5 w-5' />
                  </Button>
               </Link>
               <ModeToggle />
               <CreateButton />
            </nav>
         </div>
      </header>
   );
}
