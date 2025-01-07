import Timeline from "@/components/Timeline";
import { useHaikusContext } from "@/context/HaikusContext";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

const TimelineView = () => {
   const { haikus, loading, error, setHaikus } = useHaikusContext();

   const { userData } = useAuth();

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
         <div className='flex-grow'>
            <Timeline
               haikus={haikus}
               loading={loading}
               onHaikuUpdate={handleHaikuUpdate}
            />
         </div>
         <div className='w-80 relative'>
            <div className='sticky top-24'>
               <Sidebar />
            </div>
         </div>
      </>
   );
};

export default TimelineView;
