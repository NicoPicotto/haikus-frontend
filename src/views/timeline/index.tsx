import Timeline from "@/components/Timeline";
import { useHaikusContext } from "@/context/HaikusContext";

const TimelineView = () => {
   const { haikus, loading, error } = useHaikusContext();

   if (error) return <p>{error}</p>;

   return (
      <>
         <div className='flex-grow pt-5'>
            <Timeline haikus={haikus} loading={loading} />
         </div>
      </>
   );
};

export default TimelineView;
