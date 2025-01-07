/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
   fetchHaikus,
   createHaiku,
   updateHaiku,
   fetchHaikuByUser,
   deleteHaiku,
   fetchDailyHaiku,
   toggleSaveHaiku,
   fetchSavedHaikus,
} from "../services/haikusService";
import { Haiku } from "@/types/haiku";
import { useAuth } from "@/context/AuthContext";

interface HaikusContextType {
   haikus: Haiku[];
   setHaikus: React.Dispatch<React.SetStateAction<Haiku[]>>;
   userHaikus: Haiku[];
   savedHaikus: Haiku[];
   dailyHaiku: Haiku | null;
   loading: boolean;
   error: string | null;
   handleAddHaiku: (text: string) => Promise<void>;
   handleUpdateHaiku: (id: string, text: string) => Promise<void>;
   handleDeleteHaiku: (id: string) => Promise<void>;
   loadHaikus: () => Promise<void>;
   loadSavedHaikus: () => Promise<void>;
   loadHaikusByUser: (userId: string) => Promise<void>;
   loadDailyHaiku: () => Promise<void>;
   handleToggleSave: (
      haikuId: string,
      token: string
   ) => Promise<{ isSaved: boolean }>;
}

const HaikusContext = createContext<HaikusContextType | undefined>(undefined);

export const HaikusProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [haikus, setHaikus] = useState<Haiku[]>([]);
   const [userHaikus, setUserHaikus] = useState<Haiku[]>([]);
   const [dailyHaiku, setDailyHaiku] = useState<Haiku | null>(null);
   const [savedHaikus, setSavedHaikus] = useState<Haiku[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { token, userData, updateSavedHaikus } = useAuth();
   const { toast } = useToast();

   const loadHaikus = async (): Promise<void> => {
      setLoading(true);
      try {
         const data: Haiku[] = await fetchHaikus();

         // Si no hay userData, no se puede mapear isSaved
         if (!userData) {
            console.warn("No user data available, skipping isSaved mapping");
            setHaikus(data); // Cargar los haikus tal cual
            return;
         }

         // Mapear isSaved si hay userData
         const savedHaikus = userData.savedHaikus || [];
         const updatedHaikus = data.map((haiku) => ({
            ...haiku,
            isSaved: savedHaikus.includes(haiku._id),
         }));

         setHaikus(updatedHaikus); // Actualizar el estado
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

   const loadSavedHaikus = async () => {
      if (!token) return;
      setLoading(true);
      try {
         const data: Haiku[] = await fetchSavedHaikus(token);
         const updatedHaikus = data.map((haiku) => ({
            ...haiku,
            isSaved: true, // Asegúrate de asignar explícitamente esta propiedad
         }));
         setSavedHaikus(updatedHaikus);
      } catch (err) {
         console.error("Error fetching saved haikus:", err);
         setError("No se pudieron cargar los haikus guardados.");
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

   const loadDailyHaiku = async () => {
      setLoading(true);
      try {
         const haiku = await fetchDailyHaiku(); // Llama al servicio para obtener el Haiku del día
         setDailyHaiku(haiku); // Guarda el Haiku en el estado
      } catch (err) {
         console.error("Error fetching the daily haiku:", err);
         setError("Failed to load the daily haiku. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handleToggleSave = async (haikuId: string, token: string) => {
      try {
         const response = await toggleSaveHaiku(haikuId, token);
         const { isSaved } = response;

         // Actualiza el estado de los haikus localmente
         setHaikus((prevHaikus) =>
            prevHaikus.map((haiku) =>
               haiku._id === haikuId ? { ...haiku, isSaved } : haiku
            )
         );

         // Actualiza el estado de savedHaikus en AuthContext
         const updatedSavedHaikus = isSaved
            ? [...(userData?.savedHaikus || []), haikuId] // Añadir
            : userData?.savedHaikus.filter((id) => id !== haikuId) || []; // Eliminar

         updateSavedHaikus(updatedSavedHaikus);

         return { isSaved }; // Devuelve el nuevo estado
      } catch (error) {
         console.error("Error en handleToggleSave:", error);
         throw error;
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         console.log("Cargando haikus al montar...");
         await loadHaikus();
         await loadDailyHaiku();
      };

      fetchData();
   }, []); // Se ejecuta solo al montar el componente

   useEffect(() => {
      if (userData) {
         console.log("Actualizando haikus después del login...");
         const fetchSavedHaikus = async () => {
            await loadHaikus(); // Actualiza el estado `isSaved` después del login
         };
         fetchSavedHaikus();
      }
   }, [userData?.id]); // Solo se dispara cuando el ID de usuario cambia (login/logout)
   return (
      <HaikusContext.Provider
         value={{
            haikus,
            setHaikus,
            handleToggleSave,
            userHaikus,
            loading,
            error,
            handleAddHaiku,
            loadHaikus,
            handleDeleteHaiku,
            handleUpdateHaiku,
            loadHaikusByUser,
            loadDailyHaiku,
            dailyHaiku,
            savedHaikus,
            loadSavedHaikus,
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
