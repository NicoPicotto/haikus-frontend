import axios from "axios";

const USER_SERVICE = import.meta.env.VITE_USERS_SERVICE;

export const fetchUserById = async (id: string) => {
   const response = await axios.get(`${USER_SERVICE}/${id}`, );
   return response.data;
};
