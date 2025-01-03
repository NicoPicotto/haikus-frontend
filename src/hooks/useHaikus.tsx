import { useEffect, useState } from "react";
import { fetchHaikus, createHaiku } from "../services/haikusService";
import { Haiku } from "@/types/haiku";

export const useHaikus = () => {
   const [haikus, setHaikus] = useState<Haiku[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   //get all haikus
   useEffect(() => {
      const loadHaikus = async () => {
         try {
            setLoading(true);
            const data = await fetchHaikus();
            setHaikus(data);
         } catch (err) {
            console.error("Error fetching haikus:", err);
            setError("Failed to load haikus. Please try again.");
         } finally {
            setLoading(false);
         }
      };

      loadHaikus();
   }, []);

   //create haiku
   const handleAddHaiku = async (haiku: string) => {
      try {
         const data = await createHaiku(haiku);
         setHaikus([...haikus, data]);
      } catch (err) {
         console.error("Error creating haiku:", err);
         setError("Failed to create haiku. Please try again.");
      }
   };

   return { haikus, loading, error, handleAddHaiku };
};
