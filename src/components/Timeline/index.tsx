import HaikuCard from "../Haikus/Card";
import { Haiku } from "@/types/haiku";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export default function Timeline({
   haikus,
   loading,
   onHaikuUpdate,
   isProfile,
}: {
   haikus: Haiku[];
   loading: boolean;
   isProfile?: boolean;
   onHaikuUpdate: (updatedHaiku: Haiku) => void;
}) {
   const { userData } = useAuth();
   const userId = userData?.id;

   return (
      <div className='space-y-4 py-2'>
         {loading
            ? [...Array(5)].map((_, index) => <SkeletonCard key={index} />)
            : haikus.map((haiku) => {
                 const liked = haiku.likes.includes(userId || "");
                 const isSaved = (haiku.savedBy || []).includes(userId || "");

                 return (
                    <HaikuCard
                       key={haiku._id}
                       haiku={haiku}
                       isProfile={isProfile}
                       onLikeUpdate={() =>
                          onHaikuUpdate({
                             ...haiku,
                             likes: liked
                                ? haiku.likes.filter((id) => id !== userId)
                                : [...haiku.likes, ...(userId ? [userId] : [])],
                          })
                       }
                       onSaveUpdate={() =>
                          onHaikuUpdate({
                             ...haiku,
                             savedBy: isSaved
                                ? haiku.savedBy.filter((id) => id !== userId)
                                : [
                                     ...haiku.savedBy,
                                     ...(userId ? [userId] : []),
                                  ],
                          })
                       }
                    />
                 );
              })}
      </div>
   );
}

function SkeletonCard() {
   return (
      <div className='rounded-xl border bg-card text-card-foreground shadowoverflow-hidden dark:bg-gray-800 min-h-[229px] p-6 h-full'>
         <div className='p-6 flex  flex-col flex-grow'>
            <div className='space-y-2 flex items-center flex-col'>
               <Skeleton className='h-6 w-1/2' />
               <Skeleton className='h-6 w-3/4' />
               <Skeleton className='h-6 w-1/2' />
            </div>

            <div className='flex items-center justify-between mt-6'>
               <Skeleton className='h-4 w-1/4' />
               <Skeleton className='h-4 w-1/6' />
            </div>
         </div>
      </div>
   );
}
