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

export const createHaiku = async (haiku: string) => {
   const response = await axios.post(`${HAIKUS_SERVICE}`, { haiku });
   return response.data;
};
