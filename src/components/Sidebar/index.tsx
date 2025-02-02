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
      <aside className='h-full flex flex-col overflow-hidden '>
         <div className='flex-grow overflow-y-auto space-y-4 px-4 py-2 bg-gray-100 dark:bg-gray-900'>
            {/* Search Input */}
            <div className='relative'>
               <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
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
                     {[...Array(3)].map((_, index) => (
                        <li
                           key={index}
                           className='flex items-center justify-between'
                        >
                           <Skeleton className='h-5 my-2 w-full' />
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
                              <Button
                                 variant='link'
                                 className='text-foreground'
                              >
                                 <span>
                                    {user.firstName} {user.lastName}
                                 </span>
                              </Button>

                              <Link to={`/user/${user._id}`}>
                                 <Button variant='outline' size='sm'>
                                    Ver perfil
                                 </Button>
                              </Link>
                           </li>
                        ))}
                  </ul>
               )}
            </div>
            {/* <iframe
               src='https://open.spotify.com/embed/playlist/37i9dQZF1DX0x3hhpH7R9I?utm_source=generator'
               width='100%'
               height='400'
               frameBorder='0'
               allowfullscreen=''
               allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
               loading='lazy'
            ></iframe> */}
         </div>
      </aside>
   );
}
