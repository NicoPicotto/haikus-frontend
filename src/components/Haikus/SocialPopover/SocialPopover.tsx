import { Share2 } from "lucide-react";

import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSeparator,
   MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Haiku } from "@/types/haiku";

const SocialPopover = ({ haiku }: { haiku: Haiku }) => {
   const textToShare = encodeURIComponent(
      `${haiku.text}\n— ${haiku.author.firstName} ${haiku.author.lastName}`
   );

   const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${textToShare}`,
      whatsapp: `https://wa.me/?text=${textToShare}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${textToShare}`,
   };

   return (
      <Menubar>
         <MenubarMenu>
            <MenubarTrigger>
               <Button variant='ghost' size='sm'>
                  <Share2 className='h-4 w-4' />
               </Button>
            </MenubarTrigger>
            <MenubarContent>
               <MenubarItem>
                  {" "}
                  <a
                     href={shareLinks.twitter}
                     target='_blank'
                     rel='noreferrer'
                     className='w-full'
                  >
                     <Button variant='ghost' className='w-full' size='sm'>
                        Compartir en X
                     </Button>
                  </a>
               </MenubarItem>
               <MenubarSeparator />
               <MenubarItem>
                  {" "}
                  <a
                     href={shareLinks.whatsapp}
                     target='_blank'
                     rel='noreferrer'
                     className='w-full'
                  >
                     <Button variant='ghost' className='w-full' size='sm'>
                        Compartir en WhatsApp
                     </Button>
                  </a>
               </MenubarItem>
               <MenubarSeparator />
               <MenubarItem>
                  {" "}
                  <a
                     href={shareLinks.facebook}
                     target='_blank'
                     rel='noreferrer'
                     className='w-full'
                  >
                     <Button variant='ghost' className='w-full' size='sm'>
                        Compartir en Facebook
                     </Button>
                  </a>
               </MenubarItem>
            </MenubarContent>
         </MenubarMenu>
      </Menubar>
   );
};

export default SocialPopover;
