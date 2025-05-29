import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signupSchema } from '@shared/validation/signup-schema'
import type { SignUpFormData } from '@shared/validation/signup-schema'
export default function useSignup(){

    const navigate = useNavigate()
    
    
    const { signUp } = APICalls();

    

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            confirmPassword: '',
            email: '',
            firstname: '',
            lastname: '',
            password: ''

        }
    })

    async function onSignUp(value:SignUpFormData) {

        const response = await signUp(value)
        if(response.success){
            toast.success(response.message)
            setTimeout(()=>{
                navigate('/login');
            }, 2000
        );
        }else {
            toast.error(response.message)
        }
    }

    
    return { onSignUp, form }
    
}