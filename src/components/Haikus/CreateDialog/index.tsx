import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ComposeDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (haiku: string) => Promise<void>;
   loading: boolean;
   error: string | null;
}

export function ComposeDialog({
   isOpen,
   onClose,
   onSubmit,
   loading,
   error,
}: ComposeDialogProps) {
   const [haikuText, setHaikuText] = useState("");

   const handleTextareaChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const lines = event.target.value.split("\n");
      if (lines.length <= 3) {
         setHaikuText(event.target.value);
      }
   };

   const handleSubmit = async () => {
      if (haikuText.trim().length === 0) {
         alert("Haiku cannot be empty");
         return;
      }

      try {
         await onSubmit(haikuText); // Llamamos a la función pasada desde el hook
         setHaikuText(""); // Limpiar el textarea
         onClose(); // Cerrar el diálogo
      } catch (err) {
         console.error("Error submitting haiku:", err);
         alert("Failed to submit haiku. Please try again.");
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Compose Haiku</DialogTitle>
            </DialogHeader>
            <Textarea
               value={haikuText}
               onChange={handleTextareaChange}
               placeholder='Write your haiku here...'
               className='min-h-[100px]'
            />
            <DialogFooter>
               <Button variant='outline' onClick={onClose}>
                  Cancel
               </Button>
               <Button onClick={handleSubmit}>
                  {loading ? "Por favor espere..." : "Crear Haiku"}
               </Button>
               {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
