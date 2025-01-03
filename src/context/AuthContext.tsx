/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";

// Interfaz para los datos de usuario
interface UserData {
   token: string;
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
   userData: UserData | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
}

// Crear el contexto con un valor inicial tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [userData, setUserData] = useState<UserData | null>(() => {
      const storedUserData = localStorage.getItem("userData");
      return storedUserData ? JSON.parse(storedUserData) : null;
   });

   useEffect(() => {
      if (userData) {
         localStorage.setItem("userData", JSON.stringify(userData));
      } else {
         localStorage.removeItem("userData");
      }
   }, [userData]);

   const login = async (email: string, password: string): Promise<void> => {
      try {
         const { token } = await authService.login(email, password);
         setUserData({ token });
         console.log("Login successful:", { token });
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

   const logout = (): void => {
      setUserData(null);
   };

   return (
      <AuthContext.Provider value={{ userData, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
