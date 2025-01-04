import { useState, useEffect } from "react";
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
   defaultValue?: string;
   isEditing?: boolean;
}

export function ComposeDialog({
   isOpen,
   onClose,
   onSubmit,
   defaultValue = "",
   isEditing = false,
}: ComposeDialogProps) {
   const [haikuText, setHaikuText] = useState(defaultValue);

   //para la edicion
   useEffect(() => {
      if (defaultValue) setHaikuText(defaultValue); // Actualiza el estado si defaultValue cambia
   }, [defaultValue]);

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
         await onSubmit(haikuText); // Llama a la función pasada desde el botón
         setHaikuText(""); // Limpia el textarea
         onClose(); // Cierra el diálogo
      } catch (err) {
         console.error("Error submitting haiku:", err);
         alert("Failed to submit haiku. Please try again.");
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>
                  {isEditing ? "Editar Haiku" : "Crear Haiku"}
               </DialogTitle>
            </DialogHeader>
            <Textarea
               value={haikuText}
               onChange={handleTextareaChange}
               placeholder='Escribí tu haiku aquí...'
               className='min-h-[100px]'
            />
            <DialogFooter>
               <Button variant='outline' onClick={onClose}>
                  Cancel
               </Button>
               <Button onClick={handleSubmit}>
                  {isEditing ? "Guardar cambios" : "Crear Haiku"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
