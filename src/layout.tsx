import Header from "./components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {

   
   return (
      <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
         <Header />
         <main className='container mx-auto px-4 py-8 flex gap-8'>
            {children}
         </main>
      </div>
   );
}
