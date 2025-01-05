import Timeline from "@/components/Timeline";
import { useHaikusContext } from "@/context/HaikusContext";
import { Haiku } from "@/types/haiku";

const TimelineView = () => {
   const { haikus, loading, error, setHaikus } = useHaikusContext();

   if (error) return <p>{error}</p>;

   // Función para actualizar un haiku en el estado
   const handleHaikuUpdate = (updatedHaiku: Haiku) => {
      setHaikus((prevHaikus) =>
         prevHaikus.map((haiku) =>
            haiku._id === updatedHaiku._id ? updatedHaiku : haiku
         )
      );
   };

   return (
      <>
         <div className='flex-grow pt-5 pb-5'>
            <Timeline haikus={haikus} loading={loading} handleHaikuUpdate={handleHaikuUpdate}/>
         </div>
      </>
   );
};

export default TimelineView;
