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
}

export function ComposeDialog({ isOpen, onClose }: ComposeDialogProps) {


   const handleTextareaChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const lines = event.target.value.split("\n");
      if (lines.length <= 3) {
         //setHaiku(event.target.value);
      }
   };

   const handleSubmit = () => {
      // Here you would typically send the haiku to your backend
      //console.log("Submitted haiku:", haiku);
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Compose Haiku</DialogTitle>
            </DialogHeader>
            <Textarea
               //value={haiku}
               onChange={handleTextareaChange}
               placeholder='Write your haiku here...'
               className='min-h-[100px]'
            />
            <DialogFooter>
               <Button variant='outline' onClick={onClose}>
                  Cancel
               </Button>
               <Button onClick={handleSubmit}>Submit</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
