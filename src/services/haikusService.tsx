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
