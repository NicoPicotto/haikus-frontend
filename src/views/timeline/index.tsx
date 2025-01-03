import Timeline from "@/components/Timeline";
import Sidebar from "@/components/Sidebar";

const TimelineView = () => {
   return (
      <>
         <div className='flex-grow'>
            <Timeline />
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
