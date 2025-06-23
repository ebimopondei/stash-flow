import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { depositSechema, type DepositSchema } from '@shared/validation/deposit-schema'
import { useState } from "react";
import TransactionsApi from "@/api/transactions/transactions-api";

import { usePaystackPayment } from 'react-paystack'
import type { payStackSuccessResponse } from "@/types/paystack";
import useAuth from "../auth-provider";
import type { HookConfig } from "react-paystack/dist/types";

export default function useDeposit(){

    const [ isDepositDialogOpen, setIsDepositDialogOpen ] = useState<boolean>(false)

    const [ triggerRefresh, setTriggerRefresh ] = useState<boolean>(false);
    
    const { verrifyDeposit } = TransactionsApi();

    const { user } = useAuth()

    
    const form = useForm<DepositSchema>({
        resolver: zodResolver(depositSechema),
        defaultValues: {
            amount: ''
        }
    })

    const handlePaystackCloseAction = () => {
      console.log('closed')
    }


    async function onDeposit(value:DepositSchema) {
        const config: HookConfig = {
            reference: (new Date()).getTime().toString(),
            email: user?.email,
            metadata: {

                custom_fields:  [
                    {
                        display_name: 'userId',
                        variable_name: 'userId',
                        value: user?.id
                    }
                ]
            },
            amount: Number(value.amount) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
            publicKey: import.meta.env.VITE_PAYSTACKPUBLICKEY,
        };

    const initializePayment = usePaystackPayment(config)
    setIsDepositDialogOpen(false)
    initializePayment({ onSuccess: async(result: payStackSuccessResponse) =>{

        const response = await verrifyDeposit(result, { amount: value.amount, email: user?.email, userId: user?.id})
        if(response.success){
            toast.success(response.message)
        }else {
            toast.error(response.message)
        }
        setTriggerRefresh(prev=>!prev)
    }, onClose: handlePaystackCloseAction})

        


    }


    
    return { isDepositDialogOpen, triggerRefresh, onDeposit, setIsDepositDialogOpen, form }
    
}