import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchHaikus, createHaiku } from "../services/haikusService";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";

interface HaikusContextType {
   haikus: Haiku[];
   loading: boolean;
   error: string | null;
   handleAddHaiku: (text: string) => Promise<void>;
   loadHaikus: () => Promise<void>;
}

const HaikusContext = createContext<HaikusContextType | undefined>(undefined);

export const HaikusProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [haikus, setHaikus] = useState<Haiku[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { token } = useAuth();

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

   useEffect(() => {
      loadHaikus();
   }, []);

   return (
      <HaikusContext.Provider
         value={{ haikus, loading, error, handleAddHaiku, loadHaikus }}
      >
         {children}
      </HaikusContext.Provider>
   );
};

export const useHaikusContext = () => {
   const context = useContext(HaikusContext);
   if (context === undefined) {
      throw new Error("useHaikusContext must be used within a HaikusProvider");
   }
   return context;
};
