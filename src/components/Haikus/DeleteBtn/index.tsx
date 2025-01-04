import { useState } from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useHaikusContext } from "@/context/HaikusContext";
import { DeleteDialog } from "../DeleteDialog";

const DeleteBtn = ({ haikuId }: { haikuId: string }) => {
   const [isComposeDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

   const { handleDeleteHaiku } = useHaikusContext();

   const handleSubmit = async () => {
      try {
         await handleDeleteHaiku(haikuId); // Pasamos el ID del Haiku
         setIsDeleteDialogOpen(false); // Cerramos el diálogo después de eliminar
      } catch (err) {
         console.error("Error al eliminar el Haiku:", err);
      }
   };

   return (
      <>
         <TooltipProvider>
            <Tooltip delayDuration={0}>
               <TooltipTrigger asChild>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => setIsDeleteDialogOpen(true)}
                  >
                     <Trash2 className='h-4 w-4' />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Eliminar</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <DeleteDialog
            isOpen={isComposeDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onSubmit={handleSubmit}
         />
      </>
   );
};

export default DeleteBtn;
