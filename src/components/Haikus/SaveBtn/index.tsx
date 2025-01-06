import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useHaikusContext } from "@/context/HaikusContext";

interface SaveBtnProps {
   haikuId: string;
   isSaved: boolean;
   onToggleSave: (isSaved: boolean) => void;
}

const SaveBtn = ({ haikuId, isSaved, onToggleSave }: SaveBtnProps) => {
   const [isSaving, setIsSaving] = useState(false);
   const { token } = useAuth();
   const { handleToggleSave } = useHaikusContext();

   const handleClick = async () => {
      if (!token) {
         console.error("Usuario no autenticado");
         return;
      }

      setIsSaving(true);

      try {
         const { isSaved: newIsSaved } = await handleToggleSave(haikuId, token);

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
            <BookmarkCheck className='h-4 w-4 text-blue-500' />
         ) : (
            <Bookmark className='h-4 w-4' />
         )}
      </Button>
   );
};

export default SaveBtn;
