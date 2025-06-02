import type { DepositSchema } from "@shared/validation/deposit-schema";
import API from "../api-config";
import type { payStackSuccessResponse } from "@/types/paystack";

export default function TransactionsApi (){

    const { apiPrivate } = API();

    const verrifyDeposit= async (response: payStackSuccessResponse, data: Partial<DepositSchema>) =>{
            try {
                const res = await apiPrivate.post(`/user/deposit/verify`, { ...response, ...data } );
                return res.data;

            }catch(err:any){
                console.log(err)
                if (err.response) {
                    return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
                } else {
                    return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
                }
            }
        }
    const createDeposit= async ({ amount, email, publicKey, reference, userId }: Partial<DepositSchema>) =>{
            try {
                const res = await apiPrivate.post(`/user/deposit`, { amount, email, publicKey, reference, userId } );
                return res.data;

            }catch(err:any){
                console.log(err)
                if (err.response) {
                    return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
                } else {
                    return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
                }
            }
        }

    const getTransactions= async (page:number=1, limit:number=10) =>{
        try {
            const res = await apiPrivate.get( `/user/transactions`, { params: { page, limit}} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    return  { createDeposit, verrifyDeposit, getTransactions }

}

