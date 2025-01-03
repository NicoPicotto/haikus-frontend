import HaikuCard from "../Haikus/Card";

export default function Timeline() {
   // This would be fetched from an API in a real application
   const haikus = [
      {
         id: 1,
         author: "Matsuo Basho",
         content:
            "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.",
         likes: 120,
         comments: 15,
      },
      {
         id: 2,
         author: "Yosa Buson",
         content:
            "The light of a candle\nIs transferred to another candle—\nSpring twilight",
         likes: 89,
         comments: 7,
      },
      {
         id: 3,
         author: "Matsuo Basho",
         content:
            "A quiet river flows\nThrough a valley, a gentle river.\nThere is no sound.",
         likes: 120,
         comments: 15,
      },
      {
         id: 4,
         author: "Yosa Buson",
         content:
            "The light of a candle\nIs transferred to another candle—\nSpring twilight",
         likes: 89,
         comments: 7,
      },
      {
         id: 5,
         author: "Matsuo Basho",
         content:
            "A quiet river flows\nThrough a valley, a gentle river.\nThere is no sound.",
         likes: 120,
         comments: 15,
      },
   ];

   return (
      <div className='space-y-8'>
         {haikus.map((haiku) => (
            <HaikuCard key={haiku.id} haiku={haiku} />
         ))}
      </div>
   );
}
