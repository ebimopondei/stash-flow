import type { LoginResponse, RefreshTokenResponse, SignupResponse } from "@/types/api-response-type";
import API from "./api-config";
import type { SignUpFormData } from "@/hooks/form-hooks/use-signup-hook";

export default function APICalls (){

    const { api } = API();

    const login= async (email:string, password:string):Promise<LoginResponse> =>{
        const res = await api.post(`/auth/login`, { email, password } );
        return res.data;
    }
    
    const newRefreshToken= async ():Promise<RefreshTokenResponse> =>{
        try{
            const res = await api.post(`/auth/refresh`, {}, { withCredentials: true });
            return res.data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }

    const signUp= async ({ firstname, lastname, email, password}: Partial<SignUpFormData>):Promise<SignupResponse> =>{
        try{
            const res = await api.post(`/auth/signup`, {

                firstname, lastname, email, password
             
            }
        );
            const data = res.data
            return data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }




    

    return  { login, signUp, newRefreshToken }

}

