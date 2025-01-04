import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();
   const { toast } = useToast();

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const { register } = useAuth();

   const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      try {
         await register(email, password, firstName, lastName);
         navigate("/");
         toast({
            title: `Bienvenid@ ${firstName}!`,
            variant: "success",
         });
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
            toast({
               title: `Ocurrió un error al registrarte: ${err.message}`,
               variant: "destructive",
            });
         } else {
            setError("Error desconocido durante el registro.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='flex items-center justify-center flex-grow mt-20'>
         <Card className='w-full max-w-lg bg-sidebar bg-background'>
            <CardHeader className='flex flex-col items-center space-y-1'>
               <h2 className='text-2xl font-bold text-center'>
                  Creá tu cuenta
               </h2>
            </CardHeader>
            <CardContent className='space-y-4'>
               <div className='space-y-2'>
                  <Label htmlFor='firstName'>Nombre</Label>
                  <Input
                     id='firstName'
                     type='text'
                     placeholder='Matsuo'
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     required
                  />
               </div>
               <div className='space-y-2'>
                  <Label htmlFor='lastName'>Apellido</Label>
                  <Input
                     id='lastName'
                     type='text'
                     placeholder='Bashō'
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                  />
               </div>
               <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                     id='email'
                     type='email'
                     placeholder='name@example.com'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                     <Input
                        id='password'
                        placeholder='**********'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={togglePasswordVisibility}
                        aria-label={
                           showPassword ? "Hide password" : "Show password"
                        }
                     >
                        {showPassword ? (
                           <EyeOffIcon className='w-4 h-4 text-gray-500' />
                        ) : (
                           <EyeIcon className='w-4 h-4 text-gray-500' />
                        )}
                     </Button>
                  </div>
               </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
               <Button onClick={handleSubmit} className='w-full'>
                  {isLoading ? "Please wait..." : "Registrarse"}
               </Button>
               {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
               <Link to='/login'>
                  <Button variant='ghost' className='w-full mt-4'>
                     ¿Ya tenés una cuenta? Ingresá
                  </Button>
               </Link>
            </CardFooter>
         </Card>
      </div>
   );
};

export default Register;
