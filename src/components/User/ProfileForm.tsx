import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileForm() {
   const { user, loading, error, handleUpdateUser } = useUser();
   const { toast } = useToast();

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      city: "",
      socialLinks: {
         twitter: "",
         facebook: "",
         instagram: "",
      },
   });

   // Sincronizar formData cuando user cambie
   useEffect(() => {
      if (user) {
         setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            bio: user.bio || "",
            city: user.city || "",
            socialLinks: {
               twitter: user.socialLinks?.twitter || "",
               facebook: user.socialLinks?.facebook || "",
               instagram: user.socialLinks?.instagram || "",
            },
         });
      }
   }, [user]);

   const handleChange = (field: string, value: string, isNested = false) => {
      if (isNested && field in formData.socialLinks) {
         setFormData((prev) => ({
            ...prev,
            socialLinks: {
               ...prev.socialLinks,
               [field]: value,
            },
         }));
      } else {
         setFormData((prev) => ({
            ...prev,
            [field]: value,
         }));
      }
   };

   const isValidUrl = (url: string): boolean => {
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   };

   const handleSaveChanges = async () => {
      const socialLinks = formData.socialLinks;
      const invalidLinks = Object.entries(socialLinks).filter(
         ([, value]) => value && !isValidUrl(value)
      );

      if (invalidLinks.length > 0) {
         toast({
            title: "Error",
            description: "Algunos de los enlaces ingresados no son válidos.",
            variant: "destructive",
         });
         return;
      }

      try {
         await handleUpdateUser(formData);
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

   if (error) return <p>Error al cargar los datos: {error}</p>;

   return (
      <div className='bg-white dark:bg-gray-800 p-4  rounded-lg shadow'>
         <h2 className='font-semibold mb-4'>Datos personales</h2>
         <div className='relative space-y-4'>
            {loading && (
               <>
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
                  <Skeleton className='h-20 w-full' />
               </>
            )}
            {!loading && user && (
               <div className='space-y-4'>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Nombre</Label>
                     <Input
                        placeholder='Escribí tu nombre aquí...'
                        value={formData.firstName}
                        onChange={(e) =>
                           handleChange("firstName", e.target.value)
                        }
                        id='firstName'
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Apellido</Label>
                     <Input
                        placeholder='Escribí tu apellido aquí...'
                        value={formData.lastName}
                        onChange={(e) =>
                           handleChange("lastName", e.target.value)
                        }
                        id='lastName'
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Email</Label>

                     <Input
                        placeholder='Escribí tu email aquí...'
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Bio</Label>

                     <Textarea
                        placeholder='Escribí tu biografía aquí...'
                        value={formData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Ciudad</Label>

                     <Input
                        placeholder='Escribí tu ciudad aquí...'
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Twitter</Label>

                     <Input
                        placeholder='Twitter'
                        value={formData.socialLinks.twitter}
                        onChange={(e) =>
                           handleChange("twitter", e.target.value, true)
                        }
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Facebook</Label>

                     <Input
                        placeholder='Facebook'
                        value={formData.socialLinks.facebook}
                        onChange={(e) =>
                           handleChange("facebook", e.target.value, true)
                        }
                     />
                  </div>
                  <div className='space-y-1'>
                     <Label className='text-xs'>Instagram</Label>

                     <Input
                        placeholder='Instagram'
                        value={formData.socialLinks.instagram}
                        onChange={(e) =>
                           handleChange("instagram", e.target.value, true)
                        }
                     />
                  </div>
               </div>
            )}
            <Button onClick={handleSaveChanges}>Guardar cambios</Button>
         </div>
      </div>
   );
}
