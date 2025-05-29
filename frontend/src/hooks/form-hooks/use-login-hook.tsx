import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z} from "zod";
import useAuth from "../auth-provider";
import toast from "react-hot-toast";

const loginData = z.object( {
    email: z.string(),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})

export type LoginSchema = z.infer<typeof loginData>

export default function useLogin() {

        const { login } = APICalls();
        const { loginAuth } = useAuth()
    
    
    const form  = useForm<LoginSchema>({ 
        resolver: zodResolver(loginData),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onLogin(value:LoginSchema){
        const response = await login(value)
        if(response.success){
            toast.success(response.message)
            loginAuth(response.data)
        }else{
            toast.error(response.message)
        }


    }

    return { form, onLogin }
}