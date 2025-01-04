import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";

export default function ProfileForm() {
   const { user, loading, error } = useUser(); // Obtenemos los datos del usuario

   if (loading) return <p>Cargando información...</p>;
   if (error) return <p>Error al cargar los datos: {error}</p>;

   console.log("User", user);

   return (
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4'>
            <Input
               placeholder='Escribí tu nombre aquí...'
               defaultValue={user?.firstName || ""}
            />
            <Input
               placeholder='Escribí tu contraseña aquí...'
               defaultValue={user?.lastName || ""}
            />
            <Input
               placeholder='Escribí tu email aquí...'
               defaultValue={user?.email || ""}
               disabled
            />

            <Button variant='outline'>Guardar cambios</Button>
         </div>
      </div>
   );
}
