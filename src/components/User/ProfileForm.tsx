import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";

export default function ProfileForm() {
   const { user, loading, error, handleUpdateUser } = useUser();
   const { toast } = useToast();
   const [firstName, setFirstName] = useState(user?.firstName || "");
   const [lastName, setLastName] = useState(user?.lastName || "");
   const [email, setEmail] = useState(user?.email || "");

   if (loading) return <p>Cargando información...</p>;
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
         alert("Error al actualizar los datos. Intenta nuevamente.");
      }
   };

   return (
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4'>
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
            <Button variant='outline' onClick={handleSaveChanges}>
               Guardar cambios
            </Button>
         </div>
      </div>
   );
}
