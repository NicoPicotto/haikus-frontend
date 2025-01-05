import HaikuCard from "../Haikus/Card";
import { Haiku } from "@/types/haiku";
import { Skeleton } from "../ui/skeleton";

export default function Timeline({
   haikus,
   loading,
}: {
   haikus: Haiku[];
   loading: boolean;
}) {
   return (
      <div className='space-y-4'>
         {loading
            ? [...Array(5)].map((_, index) => <SkeletonCard key={index} />)
            : haikus.map((haiku) => (
                 <HaikuCard key={haiku._id} haiku={haiku} />
              ))}
      </div>
   );
}

function SkeletonCard() {
   return (
      <div className='overflow-hidden bg-white dark:bg-gray-800 min-h-[213px] h-full flex flex-col'>
         <div className='p-6 flex flex-col flex-grow'>
            <Skeleton className='h-8 w-3/4 mb-4' />
            <Skeleton className='h-6 w-1/2 mb-4' />
            <div className='flex items-center justify-between mt-4'>
               <Skeleton className='h-4 w-1/4' />
               <Skeleton className='h-4 w-1/6' />
            </div>
         </div>
      </div>
   );
}
