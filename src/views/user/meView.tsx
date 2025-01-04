import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import { useHaikus } from "@/hooks/useHaikus";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/User/ProfileForm";

const MeView = () => {
   const { userHaikus, loading, error, loadHaikusByUser } = useHaikus();

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
