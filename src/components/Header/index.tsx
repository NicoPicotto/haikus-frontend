import { useState } from "react";
import { Bell, User, PenTool, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { ComposeDialog } from "../Haikus/CreateDialog";

export default function Header() {
   const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);

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
               <Button variant='ghost' size='icon'>
                  <User className='h-5 w-5' />
               </Button>
               <Button variant='ghost' size='icon'>
                  <Link to='/login'>
                     <LogIn className='h-5 w-5' />
                  </Link>
               </Button>
               <ModeToggle />
               <Button onClick={() => setIsComposeDialogOpen(true)}>
                  <PenTool className='h-5 w-5 mr-2' />
                  Componer
               </Button>
            </nav>
         </div>
         <ComposeDialog
            isOpen={isComposeDialogOpen}
            onClose={() => setIsComposeDialogOpen(false)}
         />
      </header>
   );
}
