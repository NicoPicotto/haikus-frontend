import { Bell, User, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
   return (
      <header className='bg-white dark:bg-gray-800 shadow-sm'>
         <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-gray-800 dark:text-white'>
               HaikuHub
            </h1>
            <nav className='flex items-center space-x-4'>
               <Button variant='ghost' size='icon'>
                  <Bell className='h-5 w-5' />
               </Button>
               <Button variant='ghost' size='icon'>
                  <User className='h-5 w-5' />
               </Button>
               <ModeToggle />
               <Button>
                  <PenTool className='h-5 w-5 mr-2' />
                  Componer
               </Button>
            </nav>
         </div>
      </header>
   );
}
