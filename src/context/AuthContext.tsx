/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authService } from "@/services/authService";

// Interfaz para los datos de usuario
interface UserData {
   token: string;
   id: string;
   email: string;
   firstName: string;
   lastName: string;
   savedHaikus: string[];
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
   userData: UserData | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   register: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
   ) => Promise<void>;
   updateSavedHaikus: (updatedSavedHaikus: string[]) => void;
   setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Crear el contexto con un valor inicial tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const validateToken = (token: string): boolean => {
      try {
         const { exp } = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del JWT
         return Date.now() < exp * 1000; // Compara la fecha actual con la expiración
      } catch {
         return false; // Si el token no es válido, retorna falso
      }
   };

   const [userData, setUserData] = useState<UserData | null>(() => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
         const parsedData = JSON.parse(storedUserData);
         const isTokenValid = validateToken(parsedData.token); // Valida la expiración
         return isTokenValid ? parsedData : null;
      }
      return null;
   });

   useEffect(() => {
      if (userData) {
         localStorage.setItem("userData", JSON.stringify(userData));
      } else {
         localStorage.removeItem("userData");
      }
   }, [userData]);

   //para validar el token
   useEffect(() => {
      const interceptor = axios.interceptors.response.use(
         (response) => response,
         (error) => {
            if (error.response?.status === 401) {
               console.error("Token inválido o expirado, cerrando sesión.");
               logout(); // Cierra sesión automáticamente
            }
            return Promise.reject(error);
         }
      );
      return () => axios.interceptors.response.eject(interceptor);
   }, [userData]);

   const login = async (email: string, password: string): Promise<void> => {
      try {
         const { token, user } = await authService.login(email, password);
         setUserData({
            token,
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            savedHaikus: user.savedHaikus,
         });
         console.log("Login successful:", { token, user });
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Login failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   };

   const register = async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
   ): Promise<void> => {
      try {
         const { token, user } = await authService.register(
            email,
            password,
            firstName,
            lastName
         );

         // Guarda el token y los datos del usuario en el estado
         setUserData({
            token,
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            savedHaikus: user.savedHaikus,
         });

         console.log("Registration successful:", { token, user });
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Registration failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred during registration");
            throw new Error("An unexpected error occurred");
         }
      }
   };

   const logout = (): void => {
      setUserData(null);
   };

   const updateSavedHaikus = (updatedSavedHaikus: string[]) => {
      console.log("Intentando actualizar savedHaikus con:", updatedSavedHaikus);

      // Asegúrate de que no haya duplicados al actualizar userData
      setUserData((prev) => {
         if (!prev) {
            console.warn("No previous userData available, skipping update.");
            return null;
         }

         const uniqueSavedHaikus = Array.from(new Set(updatedSavedHaikus));
         console.log("Unique savedHaikus:", uniqueSavedHaikus);

         const newUserData = {
            ...prev,
            savedHaikus: uniqueSavedHaikus,
         };

         console.log(
            "Nuevo estado de userData después de actualizar savedHaikus:",
            newUserData
         );
         return newUserData;
      });
   };

   return (
      <AuthContext.Provider
         value={{
            userData,
            setUserData,
            login,
            logout,
            register,
            updateSavedHaikus,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = (): AuthContextType & {
   token: string | null;
   userId: string | null;
} => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   const token = context.userData?.token || null;
   const userId = context.userData?.id || null;
   return { ...context, token, userId };
};
