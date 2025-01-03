import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import TimelineView from "./views/timeline";
import LoginView from "./views/auth/login";
import { AuthProvider } from "./context/AuthContext";

function App() {
   return (
      <AuthProvider>
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
               </Routes>
            </Router>
         </ThemeProvider>
      </AuthProvider>
   );
}

export default App;
