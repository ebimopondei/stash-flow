import type { CreateGoalFormData } from "@shared/validation/signup-schema";
import API from "../api-config";

export default function GoalsApi (){

    const { apiPrivate } = API();

    const getGoals= async () =>{
        try {
            const res = await apiPrivate.get(`/user/goals`);
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    const getActiveGoals= async () =>{
        try {
            const res = await apiPrivate.get(`/user/goals/active`);
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null }
            }
        }
    }

    const updateGoals= async ({ id, category, deadline, description, frequency, targetAmount, title}: Partial<CreateGoalFormData>) =>{
            try {
                const res = await apiPrivate.patch(`/user/goals`, { id, category, deadline, description, frequency, targetAmount, title } );
                return res.data;

            }catch(err:any){
                console.log(err)
                if (err.response) {
                    return { success: false, message: err.response.data.message, data: null };
                } else {
                    return {success: false, message: err.message, data: null }
                }
            }
        }

    const createGoals= async ({ category, deadline, description, frequency, targetAmount, title}: Partial<CreateGoalFormData>) =>{
            try {
                const res = await apiPrivate.post(`/user/goals`, { category, deadline, description, frequency, targetAmount, title } );
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
    
    return  { getGoals, getActiveGoals, createGoals, updateGoals }

}

