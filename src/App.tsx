import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import Sidebar from "./components/Sidebar";

function App() {
   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
            <Header />
            <main className='container mx-auto px-4 py-8 flex gap-8'>
               <div className='flex-grow'>
                  <Timeline />
               </div>
               <div className='w-80 relative'>
                  <div className='sticky top-4'>
                     <Sidebar />
                  </div>
               </div>
            </main>
         </div>
      </ThemeProvider>
   );
}

export default App;
