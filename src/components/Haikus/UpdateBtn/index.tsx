import { useState } from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { Haiku } from "@/types/haiku";
import { useHaikusContext } from "@/context/HaikusContext";
import { ComposeDialog } from "../CreateDialog";

const UpdateBtn = ({ haiku }: { haiku: Haiku }) => {
   const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);

   const { handleUpdateHaiku } = useHaikusContext();

   const handleSubmit = async (text: string) => {
      await handleUpdateHaiku(haiku._id, text);
   };

   return (
      <>
         <TooltipProvider>
            <Tooltip delayDuration={0}>
               <TooltipTrigger asChild>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => setIsComposeDialogOpen(true)}
                  >
                     <PencilLine className='h-4 w-4' />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Editar</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <ComposeDialog
            onSubmit={handleSubmit}
            isOpen={isComposeDialogOpen}
            onClose={() => setIsComposeDialogOpen(false)}
            defaultValue={haiku.text}
            isEditing={true}
         />
      </>
   );
};

export default UpdateBtn;
