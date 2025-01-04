import HaikuCard from "../Haikus/Card";
import { Haiku } from "@/types/haiku";

export default function Timeline({ haikus }: { haikus: Haiku[] }) {
   return (
      <div className='space-y-8'>
         {haikus.map((haiku) => (
            <HaikuCard key={haiku._id} haiku={haiku} />
         ))}
      </div>
   );
}
