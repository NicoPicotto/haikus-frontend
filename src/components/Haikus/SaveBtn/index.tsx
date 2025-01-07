import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useHaikusContext } from "@/context/HaikusContext";
import { useToast } from "@/hooks/use-toast";

interface SaveBtnProps {
   haikuId: string;
   isSaved: boolean;
   onToggleSave: (isSaved: boolean) => void;
}

const SaveBtn = ({ haikuId, isSaved, onToggleSave }: SaveBtnProps) => {
   const [isSaving, setIsSaving] = useState(false);
   const { token } = useAuth();
   const { handleToggleSave } = useHaikusContext();
   const { toast } = useToast();

   const handleClick = async () => {
      if (!token) {
         console.error("Usuario no autenticado");
         return;
      }

      setIsSaving(true);

      try {
         const { isSaved: newIsSaved } = await handleToggleSave(haikuId, token);

         toast({
            title: newIsSaved
               ? "Haiku Guardado"
               : "Haiku eliminado de guardados",
            description: newIsSaved
               ? "El haiku se ha guardado en tu colección."
               : "El haiku se ha eliminado de tus guardados.",
            variant: "success",
         });

         console.log(`Nuevo estado isSaved para ${haikuId}:`, newIsSaved);

         // Actualizar estado del botón
         onToggleSave(newIsSaved);
      } catch (error) {
         console.error("Error al togglear el guardado:", error);
      } finally {
         setIsSaving(false);
      }
   };

   return (
      <Button
         variant='ghost'
         size='sm'
         onClick={handleClick}
         disabled={isSaving || !token}
         aria-label={isSaved ? "Unsave Haiku" : "Save Haiku"}
      >
         {isSaved ? (
            <BookmarkCheck className='h-4 w-4 text-red-500' />
         ) : (
            <Bookmark className='h-4 w-4' />
         )}
      </Button>
   );
};

export default SaveBtn;
