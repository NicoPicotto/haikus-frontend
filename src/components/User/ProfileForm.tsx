import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileForm() {
   return (
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4'>
            <Input placeholder='Escribí tu nombre aquí...' />
            <Input placeholder='Escribí tu email aquí...' />
            <Input placeholder='Escribí tu contraseña aquí...' />
            <Button variant='outline'>Guardar cambios</Button>
         </div>
      </div>
   );
}
