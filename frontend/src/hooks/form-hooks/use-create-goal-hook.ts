import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createGoalSchema, type CreateGoalFormData } from '@shared/validation/signup-schema'
import { useState } from "react";
import GoalsApi from "@/api/goals/goals-api";

export default function useCreateGoal(){

    const { createGoals } = GoalsApi();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    
    const form = useForm<CreateGoalFormData>({
        resolver: zodResolver(createGoalSchema),
        defaultValues: {
            title: '',
            targetAmount: '0',
            savedAmount: '0'

        }
    })

    async function onCreateGoal(value:CreateGoalFormData) {
        console.log(value)

        const response = await createGoals(value)
        if(response.success){
            toast.success(response.message)
        }else {
            console.log(response)
            toast.error(response.message)
        }
    }

    
    return { onCreateGoal, form, isDialogOpen, setIsDialogOpen }
    
}