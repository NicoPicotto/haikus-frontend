import Timeline from "@/components/Timeline";
import Sidebar from "@/components/Sidebar";
import { useHaikus } from "@/hooks/useHaikus";

const TimelineView = () => {
   const { haikus, loading, error } = useHaikus();

   if (loading) return <p>Cargando...</p>;
   if (error) return <p>{error}</p>;
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
