import Timeline from "@/components/Timeline";
import Sidebar from "@/components/Sidebar";
import { useHaikusContext } from "@/context/HaikusContext";

const TimelineView = () => {
   const { haikus, loading, error } = useHaikusContext();

   if (loading) return <p>Cargando...</p>;
   if (error) return <p>{error}</p>;

   console.log("Haikus en el timeline:", haikus);

   return (
      <>
         <div className='flex-grow'>
            <Timeline haikus={haikus} />
         </div>
         <div className='w-80 relative'>
            <div className='sticky top-4'>
               <Sidebar />
            </div>
         </div>
      </>
   );
};

export default TimelineView;
