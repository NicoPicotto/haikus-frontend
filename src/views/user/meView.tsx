/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/User/ProfileForm";
import { useHaikusContext } from "@/context/HaikusContext";
import { Haiku } from "@/types/haiku";

const MeView = () => {
   const { userHaikus, loading, error, loadHaikusByUser, setHaikus } =
      useHaikusContext();

   const { userId, userData } = useAuth();

   useEffect(() => {
      if (userId) {
         loadHaikusByUser(userId);
      }
   }, [userId]);

   //if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   // Función para actualizar un haiku en el estado
   const handleHaikuUpdate = (updatedHaiku: Haiku) => {
      const isSaved = updatedHaiku.savedBy.includes(userData?.id || "");
      setHaikus((prevHaikus) =>
         prevHaikus.map((haiku) =>
            haiku._id === updatedHaiku._id
               ? { ...updatedHaiku, isSaved }
               : haiku
         )
      );
   };

   return (
      <>
         <div className='w-80 relative'>
            <div className='sticky top-4'>
               <ProfileForm />
            </div>
         </div>
         <div className='flex-grow'>
            <Timeline
               haikus={userHaikus}
               loading={loading}
               onHaikuUpdate={handleHaikuUpdate}
            />
         </div>
      </>
   );
};

export default MeView;
