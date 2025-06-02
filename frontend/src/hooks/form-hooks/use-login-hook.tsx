import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from '@shared/validation/signup-schema'
import type { LoginSchema } from '@shared/validation/signup-schema'
import useAuth from "../auth-provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useLogin() {

        const { login } = APICalls();
        const { loginAuth } = useAuth();
        const [ isLoading, setIsLoading ] = useState<boolean>(false)

        const navigate = useNavigate();
    
    
    const form  = useForm<LoginSchema>({ 
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onLogin(value:LoginSchema){
        setIsLoading(true)
        const response = await login(value)
        if(response.success){
            toast.success(response.message)
            loginAuth(response.data);
            navigate('/dashboard')

        }else{
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    return { form, onLogin, isLoading }
}