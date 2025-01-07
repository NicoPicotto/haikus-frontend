/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useHaikusContext } from "@/context/HaikusContext";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import UserProfileData from "@/components/User/UserProfileData";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";

const UserView = () => {
   const {
      userHaikus,
      loading: haikusLoading,
      error: haikusError,
      loadHaikusByUser,
      setHaikus,
   } = useHaikusContext();

   const {
      selectedUser,
      loadSelectedUser,
      loading: userLoading,
      error: userError,
   } = useUser();

   const { id } = useParams<{ id: string }>();
   const { userData } = useAuth();

   useEffect(() => {
      if (id) {
         loadHaikusByUser(id);
         loadSelectedUser(id); // Cargar información del usuario
      }
   }, [id]);

   if (haikusError || userError)
      return <p>Error: {haikusError || userError}</p>;

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
               <UserProfileData user={selectedUser} loading={userLoading} />{" "}
            </div>
         </div>
         <div className='flex-grow'>
            <Timeline
               haikus={userHaikus}
               loading={haikusLoading}
               onHaikuUpdate={handleHaikuUpdate}
            />
         </div>
      </>
   );
};

export default UserView;
