import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Sidebar() {
   return (
      <aside className='space-y-6'>
         <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input placeholder='Search Haikus' className=' pl-8' />
         </div>

         <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h2 className='font-semibold mb-4'>Haijines sugeridos</h2>
            <ul className='space-y-4'>
               <li className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <span>Kobayashi Issa</span>
                  </div>
                  <Button variant='outline' size='sm'>
                     Seguir
                  </Button>
               </li>
               <li className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <span>Masaoka Shiki</span>
                  </div>
                  <Button variant='outline' size='sm'>
                     Seguir
                  </Button>
               </li>
               <li className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <span>Masaoka Shiki</span>
                  </div>
                  <Button variant='outline' size='sm'>
                     Seguir
                  </Button>
               </li>
               <li className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <span>Masaoka Shiki</span>
                  </div>
                  <Button variant='outline' size='sm'>
                     Seguir
                  </Button>
               </li>
            </ul>
         </div>
      </aside>
   );
}
