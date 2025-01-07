/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/User/ProfileForm";
import { useHaikusContext } from "@/context/HaikusContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Haiku } from "@/types/haiku";

const MeView = () => {
   const {
      userHaikus,
      loading,
      error,
      loadHaikusByUser,
      setHaikus,
      loadSavedHaikus,
      savedHaikus,
   } = useHaikusContext();

   const { userId, userData } = useAuth();

   useEffect(() => {
      if (userId) {
         loadHaikusByUser(userId);
         loadSavedHaikus();
      }
   }, [userId]);

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
         <div className='w-80 relative '>
            <div className='sticky top-24'>
               <ProfileForm />
            </div>
         </div>
         <div className='flex-grow'>
            <Tabs defaultValue='own' className='w-full'>
               <TabsList className='bg-white dark:bg-gray-800'>
                  <TabsTrigger value='own'>Mis Haikus</TabsTrigger>
                  <TabsTrigger value='saved'>Guardados</TabsTrigger>
               </TabsList>
               <TabsContent value='own'>
                  <Timeline
                     haikus={userHaikus}
                     loading={loading}
                     onHaikuUpdate={handleHaikuUpdate}
                     isProfile={true}
                  />
               </TabsContent>
               <TabsContent value='saved'>
                  <Timeline
                     haikus={savedHaikus}
                     loading={loading}
                     onHaikuUpdate={handleHaikuUpdate}
                  />
               </TabsContent>
            </Tabs>
         </div>
      </>
   );
};

export default MeView;
