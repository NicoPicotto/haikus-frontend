import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileData = ({
   user,
   loading,
}: {
   user: User | null;
   loading: boolean;
}) => {
   const formatMembershipDuration = (createdAt: string) => {
      const createdDate = new Date(createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 30) {
         return `Miembro desde hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
      } else if (diffDays < 365) {
         const months = Math.floor(diffDays / 30);
         return `Miembro desde hace ${months} mes${months > 1 ? "es" : ""}`;
      } else {
         const years = Math.floor(diffDays / 365);
         return `Miembro desde hace ${years} año${years > 1 ? "s" : ""}`;
      }
   };

   return (
      <div className='bg-white dark:bg-gray-800 p-4 mt-2 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos del Haijin</h2>
         <div className='relative space-y-4 '>
            {loading && (
               <div className='space-y-1'>
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-full' />
               </div>
            )}
            {!loading && user && (
               <div className='space-y-1'>
                  <p className='font-regular'>
                     {user?.firstName || ""} {user?.lastName || ""}
                  </p>

                  <p className='text-gray-400'>{user?.email || ""}</p>
                  {user?.createdAt && (
                     <p className='text-gray-400'>
                        {formatMembershipDuration(user.createdAt)}
                     </p>
                  )}
               </div>
            )}

            <Button variant='outline'>Seguir</Button>
         </div>
      </div>
   );
};

export default UserProfileData;
