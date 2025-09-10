import Axios from "@/utils/axios/Axios";


export const AuthLogin = async({payload}) => {
    const res = await Axios.post("/auth/login", payload)
    return res.data ?? [];
}

export const AuthSignup = async({payload}) =>{
    const res = await Axios.post("/auth/sign-up", payload);
    return res.data ?? [];
}

export const AuthGoogle = async({idToken}) => {
    const res = await Axios.post("/auth/google", {idToken});
    return res.data ?? [];
}

export const refreshToken = async() => {
    const res = await Axios.post('/auth/refresh', {},  {withCredentials: true});
    return res.data ?? [];
}