import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/User/ProfileForm";
import { useHaikusContext } from "@/context/HaikusContext";

const MeView = () => {
   const { userHaikus, loading, error, loadHaikusByUser } = useHaikusContext();

   const { userId } = useAuth();

   useEffect(() => {
      if (userId) {
         loadHaikusByUser(userId);
      }
   }, [userId]);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
      <>
         <div className='w-80 relative'>
            <div className='sticky top-4'>
               <ProfileForm />
            </div>
         </div>
         <div className='flex-grow'>
            <Timeline haikus={userHaikus} />
         </div>
      </>
   );
};

export default MeView;
