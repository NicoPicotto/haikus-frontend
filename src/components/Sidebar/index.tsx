import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import { useHaikusContext } from "@/context/HaikusContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sidebar() {
   const { users, loading, error, loadUsers } = useUser();
   const { dailyHaiku } = useHaikusContext();

   useEffect(() => {
      loadUsers();
   }, []);

   if (error) return <p>{error}</p>;

   return (
      <aside className='space-y-4'>
         <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 ' />
            <Input
               placeholder='Search Haikus'
               className='pl-8 bg-white dark:bg-background'
            />
         </div>

         <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h2 className='font-semibold mb-4'>Haiku del día</h2>
            {dailyHaiku ? (
               <div>
                  <p className='whitespace-pre-line italic mb-2 font-serif'>
                     {dailyHaiku.text}
                  </p>
                  <Link to={`/user/${dailyHaiku.author.id}`}>
                     <Button
                        variant='link'
                        size='sm'
                        className='text-gray-400 font-thin'
                     >
                        <p className='text-sm font-medium'>
                           — {dailyHaiku.author.firstName}{" "}
                           {dailyHaiku.author.lastName}
                        </p>
                     </Button>
                  </Link>
               </div>
            ) : (
               <Skeleton className='h-16 w-full min-h-[112px]' />
            )}
         </div>

         <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h2 className='font-semibold mb-4'>Haijines sugeridos</h2>
            {loading ? (
               <ul className='space-y-4'>
                  {[...Array(5)].map((_, index) => (
                     <li
                        key={index}
                        className='flex items-center justify-between'
                     >
                        <Skeleton className='h-9 w-full' />
                     </li>
                  ))}
               </ul>
            ) : (
               <ul className='space-y-4'>
                  {users &&
                     users.map((user) => (
                        <li
                           key={user._id}
                           className='flex items-center justify-between'
                        >
                           <Link to={`/user/${user._id}`}>
                              <Button
                                 variant='link'
                                 className='text-foreground'
                              >
                                 <span>
                                    {user.firstName} {user.lastName}
                                 </span>
                              </Button>
                           </Link>
                           <Button variant='outline' size='sm'>
                              Seguir
                           </Button>
                        </li>
                     ))}
               </ul>
            )}
         </div>
      </aside>
   );
}
