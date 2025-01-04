import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import { ComposeDialog } from "../CreateDialog";
import { useHaikusContext } from "@/context/HaikusContext";

export default function CreateButton() {
   const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);

   const { handleAddHaiku } = useHaikusContext();
   return (
      <>
         <Button onClick={() => setIsComposeDialogOpen(true)}>
            <PenTool className='h-5 w-5 mr-2' />
            Componer
         </Button>
         <ComposeDialog
            isOpen={isComposeDialogOpen}
            onClose={() => setIsComposeDialogOpen(false)}
            onSubmit={handleAddHaiku}
         />
      </>
   );
}
