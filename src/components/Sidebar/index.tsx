import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

export default function Sidebar() {
   const { users, loading, error, loadUsers } = useUser();

   useEffect(() => {
      loadUsers();
   }, []);

   if (loading) return <p>Cargando...</p>;
   if (error) return <p>{error}</p>;

   console.log(users);

   return (
      <aside className='space-y-6'>
         <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input placeholder='Search Haikus' className=' pl-8' />
         </div>

         <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h2 className='font-semibold mb-4'>Haijines sugeridos</h2>
            <ul className='space-y-4'>
               {users &&
                  users.map((user) => (
                     <li
                        key={user._id}
                        className='flex items-center justify-between'
                     >
                        <Link to={`/user/${user._id}`}>
                           <Button variant='link' className='text-foreground'>
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
         </div>
      </aside>
   );
}
