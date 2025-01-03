import axios from "axios";

const AUTH_SERVICE = import.meta.env.VITE_AUTH_SERVICE;

export const authService = {
   login: async (email: string, password: string) => {
      try {
         const response = await axios.post(`${AUTH_SERVICE}/login`, {
            email,
            password,
         });
         return response.data;
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            console.error(
               "Error during login:",
               error.response?.data?.message || error.message
            );
            throw new Error(error.response?.data?.message || "Login failed");
         }
         console.error("Unexpected error during login:", error);
         throw new Error("An unexpected error occurred");
      }
   },
};
