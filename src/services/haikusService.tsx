import axios from "axios";

const HAIKUS_SERVICE = import.meta.env.VITE_HAIKUS_SERVICE;

export const fetchHaikus = async () => {
   const response = await axios.get(`${HAIKUS_SERVICE}`);
   return response.data;
};

export const fetchHaikuById = async (id: number) => {
   const response = await axios.get(`${HAIKUS_SERVICE}/${id}`);
   return response.data;
};

export const fetchHaikuByUser = async (id: string) => {
   const response = await axios.get(`${HAIKUS_SERVICE}/user/${id}`);
   return response.data;
};

export const deleteHaiku = async (id: string, token: string) => {
   try {
      const response = await axios.delete(`${HAIKUS_SERVICE}/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error deleting haiku:", error);
      throw error;
   }
};

export const createHaiku = async (text: string, token: string) => {
   try {
      const response = await axios.post(
         `${HAIKUS_SERVICE}`,
         { text },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error creating haiku:", error);
      throw error;
   }
};

export const updateHaiku = async (id: string, text: string, token: string) => {
   try {
      const response = await axios.put(
         `${HAIKUS_SERVICE}/${id}`,
         { text },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data.updatedHaiku;
   } catch (error) {
      console.error("Error updating haiku:", error);
      throw error;
   }
};

export const fetchDailyHaiku = async () => {
   try {
      const response = await axios.get(`${HAIKUS_SERVICE}/daily`);
      return response.data;
   } catch (error) {
      console.error("Error fetching daily haiku:", error);
      throw error;
   }
};

export const toggleLikeHaiku = async (id: string, token: string) => {
   try {
      const response = await axios.patch(
         `${HAIKUS_SERVICE}/${id}/like`,
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error updating haiku:", error);
      throw error;
   }
};

export const toggleSaveHaiku = async (id: string, token: string) => {
   try {
      const response = await axios.patch(
         `${HAIKUS_SERVICE}/save/${id}`,
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error toggling save haiku:", error);
      throw error;
   }
};
