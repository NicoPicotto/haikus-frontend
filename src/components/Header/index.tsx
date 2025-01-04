import { User, LogIn, LogOut, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateButton from "../Haikus/CreateBtn/CreateButton";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
   const { userData, logout } = useAuth();

   return (
      <header className='bg-white dark:bg-gray-800 shadow-sm'>
         <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link to='/'>
               <h1 className='text-2xl font-semibold text-gray-800 dark:text-white'>
                  HaikuHub
               </h1>
            </Link>
            <nav className='flex items-center space-x-4'>
               {/* <Button variant='ghost' size='icon'>
                  <Bell className='h-5 w-5' />
               </Button> */}
               {userData && (
                  <>
                     <TooltipProvider>
                        <Tooltip delayDuration={0}>
                           <TooltipTrigger asChild>
                              <Link to='/me'>
                                 <Button variant='ghost' size='icon'>
                                    <User className='h-5 w-5' />
                                 </Button>
                              </Link>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Mi Perfil</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>

                     <TooltipProvider>
                        <Tooltip delayDuration={0}>
                           <TooltipTrigger asChild>
                              <Button
                                 variant='ghost'
                                 size='icon'
                                 onClick={logout}
                              >
                                 <LogOut className='h-5 w-5' />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Logout</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </>
               )}

               {!userData && (
                  <TooltipProvider>
                     <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                           <Link to='/login'>
                              <Button variant='ghost' size='icon'>
                                 <LogIn className='h-5 w-5' />
                              </Button>
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Ingresar</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}

               <ModeToggle />
               {!userData && (
                  <Link to='login'>
                     <Button>
                        <PenTool className='h-5 w-5 mr-2' />
                        Componer
                     </Button>
                  </Link>
               )}
               {userData && <CreateButton />}
            </nav>
         </div>
      </header>
   );
}
