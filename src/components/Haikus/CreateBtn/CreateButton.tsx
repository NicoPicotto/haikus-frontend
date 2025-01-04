import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import { ComposeDialog } from "../CreateDialog";
import { useHaikus } from "@/hooks/useHaikus";

export default function CreateButton() {
   const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);

   const { loading, error, handleAddHaiku } = useHaikus();

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

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
            loading={loading}
            error={error}
         />
      </>
   );
}
