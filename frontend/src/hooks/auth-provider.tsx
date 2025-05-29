import {  createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useCookie from "./use-cookie";
import type { Props } from "@/types";
import type { loginProps } from "@/types/api-response-type";


type AuthContextType = {
    loginAuth: ( { }: loginProps) => void;
    logoutAuth: () => void;
    token: string;
    refreshToken: string;
    setToken: Dispatch<SetStateAction<string>>;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    isLoggedIn:boolean,
    isLoading:boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    token: "",
    refreshToken: "",
    setToken: ()=> {},
    setRefreshToken: ()=> {},
    isLoggedIn: false,
    isLoading: false,
    setIsLoggedIn: ()=>{}
});

export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}: Props){

    const { getCookie, setCookie, resetItem} = useCookie();
    const [ token, setToken] = useState<string>("");
    const [ isLoading, setIsLoading] = useState<boolean>(true);
    const [ refreshToken, setRefreshToken] = useState<string>("");
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    const loginAuth = ({token, refreshToken}:loginProps) => {
        setToken(token);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
        setCookie('token', JSON.stringify(token) );
        setCookie('refreshToken', JSON.stringify(refreshToken) );
        setCookie('isLoggedIn', JSON.stringify(true) );
    }
    
    const logoutAuth = ()=> {
        setIsLoggedIn(false);
        setToken('');
        setRefreshToken(''); 
        resetItem("token");
        resetItem("refreshToken");
        resetItem('isLoggedIn');
    }

    useEffect( ()=>{
        // async function checkAuth(){
        //     await apiPrivate('/auth-check')
        //     .then((res)=>{
        //         setIsLoggedIn(res.data.isAuthenticated);
        //         setIsLoading(false)
        //     })
        //     .finally( ()=> setIsLoading(false))
        // }
        // checkAuth();

    },[])


    useEffect(()=>{
        if(getCookie('token')){
            const temp = getCookie('token');
            setToken(JSON.parse(temp));
        }
        
        if(getCookie('isLoggedIn')){
            const temp =  String(getCookie('isLoggedIn'));
            const token  = JSON.parse(temp);
            setIsLoggedIn(Boolean(token));
        }

        if(getCookie('refreshToken')){
            const temp =  getCookie('refreshToken');
            setRefreshToken(JSON.parse(temp));
        }

        setIsLoading(false)
    },[])

    return(
        <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn, loginAuth, logoutAuth, token, setToken, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )

}