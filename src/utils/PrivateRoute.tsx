import { useAuth } from "@/context/AuthContext";
import type {  ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    Children : ReactNode
}

const PrivateRoute = ({Children} : PrivateRouteProps) => {
    const {accessToken} = useAuth();
    if(!accessToken){
        return <Navigate to="/login" replace />
    }

    return Children;
};

export default PrivateRoute;