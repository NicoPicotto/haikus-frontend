import axios from "axios";
import { UpdateUserPayload } from "@/types/user";

const USER_SERVICE = import.meta.env.VITE_USERS_SERVICE;

export const fetchUserById = async (id: string) => {
   const response = await axios.get(`${USER_SERVICE}/${id}`);
   return response.data;
};

export const fetchUsers = async () => {
   const response = await axios.get(`${USER_SERVICE}`);
   return response.data;
};

export const updateUser = async (
   id: string,
   data: UpdateUserPayload,
   token: string
) => {
   try {
      const response = await axios.put(`${USER_SERVICE}/${id}`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.updatedUser;
   } catch (error) {
      console.error("Error updating user:", error);
      throw error;
   }
};
