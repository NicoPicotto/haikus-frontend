import { useEffect, useState } from "react";
import { fetchHaikus, createHaiku } from "../services/haikusService";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";

export const useHaikus = () => {
   const [haikus, setHaikus] = useState<Haiku[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const { token } = useAuth();
   // Fetch all haikus
   const loadHaikus = async () => {
      setLoading(true);
      try {
         const data = await fetchHaikus();
         setHaikus(data);
      } catch (err) {
         console.error("Error fetching haikus:", err);
         setError("Failed to load haikus. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      loadHaikus();
   }, []);

   // Create a new haiku
   const handleAddHaiku = async (text: string) => {
      if (!token) {
         setError("User not authenticated");
         return;
      }

      try {
         setLoading(true);
         const newHaiku = await createHaiku(text, token);
         setHaikus((prevHaikus) => [...prevHaikus, newHaiku]);
      } catch (err) {
         console.error("Error creating haiku:", err);
         setError("Failed to create haiku. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return { haikus, loading, error, handleAddHaiku, loadHaikus };
};
