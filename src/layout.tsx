import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   const location = useLocation();

   const isLoginRoute =
      location.pathname === "/login" || location.pathname === "/register";

   return (
      <div className='min-h-screen bg-gray-100 dark:bg-gray-900 grid grid-rows-[auto,1fr]'>
         <Header />

         <div
            className={
               isLoginRoute
                  ? "grid grid-cols-[1fr] container mx-auto gap-8"
                  : "grid grid-cols-[300px,1fr] container mx-auto gap-8"
            }
         >
            {!isLoginRoute && (
               <div className='sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto'>
                  <Sidebar />
               </div>
            )}

            <main className='overflow-y-auto'>{children}</main>
         </div>

         <Toaster />
      </div>
   );
}
