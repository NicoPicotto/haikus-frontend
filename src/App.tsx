import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import TimelineView from "./views/timeline";
import LoginView from "./views/auth/login";
import { AuthProvider } from "./context/AuthContext";
import { HaikusProvider } from "./context/HaikusContext";
import MeView from "./views/user/meView";
import UserView from "./views/user/userView";
import RegisterView from "./views/auth/register";

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
                        path='register'
                        element={
                           <Layout>
                              <RegisterView />
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
                     <Route
                        path='/user/:id'
                        element={
                           <Layout>
                              <UserView />
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
