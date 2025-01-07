import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileForm() {
   const { user, loading, error, handleUpdateUser } = useUser();
   const { toast } = useToast();
   const [firstName, setFirstName] = useState(user?.firstName || "");
   const [lastName, setLastName] = useState(user?.lastName || "");
   const [email, setEmail] = useState(user?.email || "");

   //if (loading) return <p>Cargando información...</p>;
   if (error) return <p>Error al cargar los datos: {error}</p>;

   const handleSaveChanges = async () => {
      try {
         await handleUpdateUser({
            firstName: firstName || user?.firstName,
            lastName: lastName || user?.lastName,
            email: email || user?.email,
         });
         toast({
            title: "Datos actualizados.",
            variant: "success",
         });
      } catch (err) {
         console.error("Error updating user:", err);
         toast({
            title: "Error al actualizar los datos.",
            variant: "destructive",
         });
      }
   };

   return (
      <div className='bg-white dark:bg-gray-800 p-4 mt-2 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4'>
            {loading && (
               <>
                  <Skeleton className='h-9 w-full' />
                  <Skeleton className='h-9 w-full' />
                  <Skeleton className='h-9 w-full' />
               </>
            )}
            {!loading && user && (
               <>
                  <Input
                     placeholder='Escribí tu nombre aquí...'
                     defaultValue={user?.firstName || ""}
                     onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                     placeholder='Escribí tu contraseña aquí...'
                     defaultValue={user?.lastName || ""}
                     onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                     placeholder='Escribí tu email aquí...'
                     defaultValue={user?.email || ""}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </>
            )}

            <Button variant='outline' onClick={handleSaveChanges}>
               Guardar cambios
            </Button>
         </div>
      </div>
   );
}
