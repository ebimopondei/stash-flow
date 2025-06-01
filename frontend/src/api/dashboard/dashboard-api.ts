import type { StatisticsResponse } from "@/types/dashboard";
import API from "../api-config";

export default function DashboardApi (){

    const { apiPrivate } = API();

    const getDashboardStats= async (): Promise<StatisticsResponse> =>{
        try {
            const res = await apiPrivate.get(`/user/dashboard`);
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null}
            }
        }
    }
    
    return  { getDashboardStats }

}

