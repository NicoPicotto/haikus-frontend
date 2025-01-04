import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import TimelineView from "./views/timeline";
import LoginView from "./views/auth/login";
import { AuthProvider } from "./context/AuthContext";
import { HaikusProvider } from "./context/HaikusContext";
import MeView from "./views/user/meView";

function App() {
   return (
      <AuthProvider>
         <HaikusProvider>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
               <Router>
                  <Routes>
                     <Route
                        path='/'
                        element={
                           <Layout>
                              <TimelineView />
                           </Layout>
                        }
                     />
                     <Route
                        path='/login'
                        element={
                           <Layout>
                              <LoginView />
                           </Layout>
                        }
                     />
                     <Route
                        path='/me'
                        element={
                           <Layout>
                              <MeView />
                           </Layout>
                        }
                     />
                  </Routes>
               </Router>
            </ThemeProvider>
         </HaikusProvider>
      </AuthProvider>
   );
}

export default App;
