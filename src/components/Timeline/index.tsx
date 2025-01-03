import HaikuCard from "../Haikus/Card";
import { useHaikus } from "@/hooks/useHaikus";

export default function Timeline() {
   const { haikus, loading, error } = useHaikus();

   if (loading) return <p>Cargando...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className='space-y-8'>
         {haikus.map((haiku) => (
            <HaikuCard key={haiku._id} haiku={haiku} />
         ))}
      </div>
   );
}
