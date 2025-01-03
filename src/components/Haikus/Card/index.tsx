import { Heart, MessageCircle, Share2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HaikuProps {
   haiku: {
      id: number;
      author: string;
      content: string;
      likes: number;
      comments: number;
   };
}

export default function HaikuCard({ haiku }: HaikuProps) {
   return (
      <Card className='overflow-hidden'>
         <CardContent className='p-6'>
            <p className='whitespace-pre-line font-serif text-2xl mb-4 text-center leading-relaxed'>
               {haiku.content}
            </p>
            <div className='flex items-center justify-between mt-4'>
               <div className='flex items-center space-x-2 px-4 py-2 border border-primary rounded-full'>
                  <PencilLine className='h-4 w-4 mr-1' />

                  <p className='text-sm font-medium'>{haiku.author}</p>
               </div>
               <div className='flex space-x-2'>
                  <Button variant='ghost' size='sm'>
                     <Heart className='h-4 w-4 mr-1' />
                     {haiku.likes}
                  </Button>
                  <Button variant='ghost' size='sm'>
                     <MessageCircle className='h-4 w-4 mr-1' />
                     {haiku.comments}
                  </Button>
                  <Button variant='ghost' size='sm'>
                     <Share2 className='h-4 w-4' />
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
