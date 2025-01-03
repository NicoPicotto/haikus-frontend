import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
   children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
   const { userData } = useAuth();

   console.log(userData);

   return userData ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
