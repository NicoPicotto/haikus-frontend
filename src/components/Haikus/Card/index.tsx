import { Share2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Haiku } from "@/types/haiku";

interface HaikuCardProps {
   haiku: Haiku;
}

export default function HaikuCard({ haiku }: HaikuCardProps) {
   const formattedDate = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   }).format(new Date(haiku.date));

   return (
      <Card className='overflow-hidden dark:bg-gray-800'>
         <CardContent className='p-6'>
            <p className='whitespace-pre-line font-serif text-2xl mb-4 text-center leading-relaxed'>
               {haiku.text}
            </p>
            <div className='flex items-center justify-between mt-4'>
               <Link to={`/user/${haiku.author.id}`}>
                  <Button variant='link' size='sm' className='text-gray-400 '>
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
                  {/* <Button variant='ghost' size='sm'>
                     <Heart className='h-4 w-4' />
                     {haiku.likes}
                  </Button>
                  <Button variant='ghost' size='sm'>
                     <MessageCircle className='h-4 w-4' />
                     {haiku.comments}
                  </Button> */}
                  <TooltipProvider>
                     <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                           <Button variant='ghost' size='sm'>
                              <Share2 className='h-4 w-4' />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Compartir</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
