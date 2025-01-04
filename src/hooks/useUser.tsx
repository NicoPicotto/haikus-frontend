/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../services/userService";
import { User, UpdateUserPayload } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

export const useUser = () => {
   const [user, setUser] = useState<User | null>(null);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const { token, userId } = useAuth();

   const loadUser = async () => {
      if (!userId) {
         setError("User ID is required");
         setLoading(false);
         return;
      }
      setLoading(true);
      try {
         const data = await fetchUserById(userId);
         setUser(data);
      } catch (err) {
         console.error("Error fetching user:", err);
         setError("Failed to load user. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const loadSelectedUser = async (id: string) => {
      setLoading(true);
      try {
         const data = await fetchUserById(id);
         setSelectedUser(data);
      } catch (err) {
         console.error("Error fetching selected user:", err);
         setError("Failed to load selected user. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handleUpdateUser = async (data: UpdateUserPayload) => {
      if (!userId || !token) {
         setError("User not authenticated");
         return;
      }

      setLoading(true);
      try {
         const updatedUser = await updateUser(userId, data, token); //
         setUser(updatedUser);
      } catch (err) {
         console.error("Error updating user:", err);
         setError("Failed to update user data.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      loadUser();
   }, []);

   return {
      user,
      loading,
      error,
      loadSelectedUser,
      handleUpdateUser,
      selectedUser,
   };
};