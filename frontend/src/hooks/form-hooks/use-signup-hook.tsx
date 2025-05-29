import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { z } from "zod"; 
 
export type SignUpFormData = z.infer<typeof signupSchema>;

const signupSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email('Enter valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

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