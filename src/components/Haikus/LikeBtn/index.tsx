import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toggleLikeHaiku } from "@/services/haikusService";

interface LikeBtnProps {
   haikuId: string;
   liked: boolean;
   likesCount: number;
   onUpdate: (likesCount: number, liked: boolean) => void;
}

const LikeBtn = ({ haikuId, liked, likesCount, onUpdate }: LikeBtnProps) => {
   const [isLiking, setIsLiking] = useState(false);
   const { token } = useAuth();

   const handleToggleLike = async () => {
      if (!token) {
         console.error("Usuario no autenticado");
         return;
      }

      setIsLiking(true);

      try {
         const { likesCount: newLikesCount, liked: newLiked } =
            await toggleLikeHaiku(haikuId, token);

         onUpdate(newLikesCount, newLiked);
      } catch (error) {
         console.error("Error al togglear el like:", error);
      } finally {
         setIsLiking(false);
      }
   };

   return (
      <Button
         variant='ghost'
         size='sm'
         onClick={handleToggleLike}
         disabled={isLiking || !token}
      >
         <Heart className={`h-4 w-4 ${liked ? "text-red-500" : null}`} />
         <span className='text-sm'>{likesCount}</span>
      </Button>
   );
};

export default LikeBtn;
