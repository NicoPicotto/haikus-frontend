/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useHaikus } from "@/hooks/useHaikus";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import UserProfileData from "@/components/User/UserProfileData";

const UserView = () => {
   const {
      userHaikus,
      loading: haikusLoading,
      error: haikusError,
      loadHaikusByUser,
   } = useHaikus();
   const {
      selectedUser,
      loadSelectedUser,
      loading: userLoading,
      error: userError,
   } = useUser();

   const { id } = useParams<{ id: string }>();

   useEffect(() => {
      if (id) {
         loadHaikusByUser(id);
         loadSelectedUser(id); // Cargar información del usuario
      }
   }, [id]);

   if (haikusLoading || userLoading) return <p>Loading...</p>;
   if (haikusError || userError)
      return <p>Error: {haikusError || userError}</p>;

   return (
      <>
         <div className='w-80 relative'>
            <div className='sticky top-4'>
               <UserProfileData user={selectedUser} />{" "}
               {/* Pasamos la info del usuario seleccionado */}
            </div>
         </div>
         <div className='flex-grow'>
            <Timeline haikus={userHaikus} />
         </div>
      </>
   );
};

export default UserView;
