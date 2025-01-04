import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

const UserProfileData = ({ user }: { user: User | null }) => {
   return (
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4 '>
            <div>
               <p>
                  {user?.firstName || ""} {user?.lastName || ""}
               </p>

               <p className='text-gray-400'>{user?.email || ""}</p>
            </div>

            <Button variant='outline'>Seguir</Button>
         </div>
      </div>
   );
};

export default UserProfileData;
