import { refreshToken } from "@/services/auth/Auth";
import { createContext, useContext, useEffect, useState , type ReactNode} from "react";
import { toast } from "sonner";

type User = {
    userID : string,
    Name: string,
    Email : string,
};

type AuthContextType = {
    user : User | null;
    accessToken : string | null;
    login: (data : {accessToken: string;  user : User }) => void;
    logout : () => void;
}

export const AuthContext = createContext<AuthContextType | null> (null);

export const AuthProvider = ({ children } : { children : ReactNode}) => {
    const [user , setUser] = useState<User | null> (() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null
    });

    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem("accessToken")
    });

    useEffect(() => {
        if(!accessToken) return;

        const interval = setInterval( async () => {

            try {
                const data = await refreshToken();
                setAccessToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken)
                
            } catch (error) {
                logout();
                toast.error("Session Expired Please Login again");
            }
        }, 14 * 60 * 1000)

        return () => clearInterval(interval);
    }, [accessToken]);

    const login = (data : { accessToken : string; user: User}) => {
        setAccessToken(data.accessToken);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    };

    return(
        <AuthContext.Provider value = {{ user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}