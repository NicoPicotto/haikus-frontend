import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";
import SocialPopover from "../SocialPopover/SocialPopover";
import LikeBtn from "../LikeBtn";
import SaveBtn from "../SaveBtn";

interface HaikuCardProps {
   haiku: Haiku;
   onLikeUpdate: (updatedHaiku: Haiku) => void;
   onSaveUpdate: (updatedHaiku: Haiku) => void;
}

export default function HaikuCard({
   haiku,
   onLikeUpdate,
   onSaveUpdate,
}: HaikuCardProps) {
   const { userData } = useAuth();

   const formattedDate = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   }).format(new Date(haiku.date));

   const isAuthor = userData?.id === haiku.author.id;

   const handleLikeUpdate = (likesCount: number, liked: boolean) => {
      onLikeUpdate({ ...haiku, likesCount, liked });
   };

   const handleSaveUpdate = (isSaved: boolean) => {
      const updatedSavedBy = isSaved
         ? [...haiku.savedBy, userData?.id || ""]
         : haiku.savedBy.filter((id) => id !== userData?.id);
      onSaveUpdate({ ...haiku, savedBy: updatedSavedBy });
   };

   return (
      <Card className='overflow-hidden dark:bg-gray-800 min-h-[213px] h-full flex flex-col'>
         <CardContent className='p-6 flex flex-col flex-grow'>
            <p className='whitespace-pre-line font-serif text-2xl mb-4 text-center leading-relaxed flex-grow'>
               {haiku.text}
            </p>
            <div className='flex items-center justify-between mt-4'>
               <Link to={`/user/${haiku.author.id}`}>
                  <Button
                     variant='link'
                     size='sm'
                     className='text-gray-400 font-thin'
                  >
                     <PencilLine className='h-4 w-4 mr-1' />
                     <p className='text-sm font-medium'>
                        {haiku.author.firstName} {haiku.author.lastName}
                     </p>
                  </Button>
               </Link>
               <div className='flex space-x-1'>
                  <p className='text-gray-400 text-sm pt-1.5 mr-1'>
                     {formattedDate}
                  </p>
                  {isAuthor && (
                     <>
                        <UpdateBtn haiku={haiku} />
                        <DeleteBtn haikuId={haiku._id} />
                     </>
                  )}
                  <LikeBtn
                     haikuId={haiku._id}
                     liked={haiku.likes.includes(userData?.id || "")}
                     likesCount={haiku.likes.length}
                     onUpdate={handleLikeUpdate}
                  />
                  <SaveBtn
                     haikuId={haiku._id}
                     isSaved={(haiku.savedBy || []).includes(
                        userData?.id || ""
                     )}
                     onToggleSave={handleSaveUpdate}
                  />
                  <SocialPopover haiku={haiku} />
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
