import { User } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, PenLine } from "lucide-react";
import { TwitterOutline } from "@styled-icons/evaicons-outline/TwitterOutline";
import { FacebookOutline } from "@styled-icons/evaicons-outline/FacebookOutline";
import { Instagram } from "@styled-icons/remix-line/Instagram";

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
         <h2 className='font-semibold mb-4 underline decoration-primary'>
            Datos del Haijin
         </h2>
         <div className='relative space-y-4 '>
            {loading && (
               <div className='space-y-2'>
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-full' />
               </div>
            )}
            {!loading && user && (
               <div className='space-y-2'>
                  <p className='font-semibold'>
                     {user?.firstName || ""} {user?.lastName || ""}
                  </p>

                  <div className='flex items-center text-sm'>
                     <MapPin className='h-3.5 w-3.5 mr-1 text-primary' />
                     <p className=''>{user?.city || ""}</p>
                  </div>
                  <div className='flex items-center text-sm'>
                     <PenLine className='h-3.5 w-3.5 mr-1 text-primary' />
                     <p className=''>{user?.bio || ""}</p>
                  </div>
                  {user?.socialLinks?.twitter !== "" && (
                     <div className='flex items-center text-sm'>
                        <TwitterOutline className='h-3.5 w-3.5 mr-1 text-primary' />
                        <a
                           target='_blank'
                           href={user?.socialLinks?.twitter}
                           className=''
                        >
                           {user?.socialLinks?.twitter || ""}
                        </a>
                     </div>
                  )}
                  {user?.socialLinks?.facebook !== "" && (
                     <div className='flex items-center text-sm'>
                        <FacebookOutline className='h-3.5 w-3.5 mr-1 text-primary' />
                        <a
                           target='_blank'
                           href={user?.socialLinks?.facebook}
                           className=''
                        >
                           {user?.socialLinks?.facebook || ""}
                        </a>
                     </div>
                  )}
                  {user?.socialLinks?.instagram !== "" && (
                     <div className='flex items-center text-sm'>
                        <Instagram className='h-3.5 w-3.5 mr-1 text-primary' />
                        <a
                           href={user?.socialLinks?.instagram}
                           target='_blank'
                           className=''
                        >
                           {user?.socialLinks?.instagram || ""}
                        </a>
                     </div>
                  )}

                  <div className='mt-2'>
                     {user?.createdAt && (
                        <Badge variant='secondary'>
                           {formatMembershipDuration(user.createdAt)}
                        </Badge>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default UserProfileData;
