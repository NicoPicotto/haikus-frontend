/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
   fetchHaikus,
   createHaiku,
   updateHaiku,
   fetchHaikuByUser,
   deleteHaiku,
} from "../services/haikusService";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";

interface HaikusContextType {
   haikus: Haiku[];
   userHaikus: Haiku[];
   loading: boolean;
   error: string | null;
   handleAddHaiku: (text: string) => Promise<void>;
   handleUpdateHaiku: (id: string, text: string) => Promise<void>;
   handleDeleteHaiku: (id: string) => Promise<void>;
   loadHaikus: () => Promise<void>;
   loadHaikusByUser: (userId: string) => Promise<void>;
}

const HaikusContext = createContext<HaikusContextType | undefined>(undefined);

export const HaikusProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [haikus, setHaikus] = useState<Haiku[]>([]);
   const [userHaikus, setUserHaikus] = useState<Haiku[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { token } = useAuth();
   const { toast } = useToast();

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
         toast({
            title: "Haiku creado con éxito.",
            variant: "success",
         });
      } catch (err) {
         console.error("Error creating haiku:", err);
         setError("Failed to create haiku. Please try again.");
         toast({
            title: "Error al crear haiku.",
            variant: "destructive",
         });
      } finally {
         setLoading(false);
      }
   };

   const handleUpdateHaiku = async (id: string, text: string) => {
      if (!token) {
         setError("User not authenticated");
         return;
      }

      try {
         setLoading(true);
         const updatedHaiku = await updateHaiku(id, text, token);

         // Actualiza el estado local
         setHaikus((prevHaikus) =>
            prevHaikus.map((haiku) =>
               haiku._id === id ? { ...haiku, text: updatedHaiku.text } : haiku
            )
         );
         toast({
            title: "Haiku actualizado con éxito.",
            variant: "success",
         });
      } catch (err) {
         console.error("Error updating haiku:", err);
         setError("Failed to update haiku. Please try again.");
         toast({
            title: "Error al actualizar haiku.",
            variant: "destructive",
         });
      } finally {
         setLoading(false);
      }
   };

   const loadHaikusByUser = async (userId: string) => {
      setLoading(true);
      try {
         const data = await fetchHaikuByUser(userId); // Llama al servicio para obtener haikus por usuario
         setUserHaikus(data); // Actualiza el estado de userHaikus
      } catch (err) {
         console.error("Error fetching haikus by user:", err);
         setError("Failed to load haikus for the user. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteHaiku = async (id: string) => {
      if (!token) {
         setError("User not authenticated");
         return;
      }

      try {
         setLoading(true);
         await deleteHaiku(id, token); // Llama al servicio para borrar el haiku
         setHaikus(
            (prevHaikus) => prevHaikus.filter((haiku) => haiku._id !== id) // Actualiza el estado local
         );
         toast({
            title: "Haiku eliminado con éxito.",
            variant: "success",
         });
      } catch (err) {
         console.error("Error deleting haiku:", err);
         setError("Failed to delete haiku. Please try again.");
         toast({
            title: "Error al eliminar haiku.",
            variant: "destructive",
         });
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      loadHaikus();
   }, []);

   return (
      <HaikusContext.Provider
         value={{
            haikus,
            userHaikus,
            loading,
            error,
            handleAddHaiku,
            loadHaikus,
            handleDeleteHaiku,
            handleUpdateHaiku,
            loadHaikusByUser,
         }}
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
