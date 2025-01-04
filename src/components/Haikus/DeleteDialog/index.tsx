import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: () => Promise<void>;
}

export function DeleteDialog({ isOpen, onClose, onSubmit }: DeleteDialogProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader className='mb-6'>
               <DialogTitle>
                  ¿Seguro que quieres eliminar este haiku?
               </DialogTitle>
            </DialogHeader>

            <DialogFooter>
               <Button variant='outline' onClick={onClose}>
                  Cancel
               </Button>
               <Button variant='destructive' onClick={onSubmit}>
                  Eliminar
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
