import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createGoalSchema, type CreateGoalFormData } from '@shared/validation/goals-schema'
import { useEffect, useState } from "react";
import GoalsApi from "@/api/goals/goals-api";

export default function useGoal(){

    const [ editingGoal, setEditingGoal ] = useState<CreateGoalFormData | null>(null)

    const [ isEditDialogOpen, setIsEditDialogOpen ] = useState<boolean>(false)

    const [ triggerRefresh, setTriggerRefresh ] = useState<boolean>(false);
    

    const { createGoals, updateGoals } = GoalsApi();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const form = useForm<CreateGoalFormData>({
        resolver: zodResolver(createGoalSchema),
        defaultValues: {
            title: '',
            targetAmount: '0',
            savedAmount: '0'
        }
    })

    const editForm = useForm<CreateGoalFormData>({
        resolver: zodResolver(createGoalSchema),
        defaultValues:{
            title: '',
            targetAmount: '0',
            savedAmount: '0'

        }
    })

    useEffect(()=>{
        if(editingGoal){
            editForm.reset({
                id: editingGoal.id,
                title: editingGoal.title,
                description: editingGoal.description,
                targetAmount: String(editingGoal.targetAmount),
                deadline: new Date(editingGoal.deadline).toISOString().split('T')[0],
                category: editingGoal.category,
                frequency: editingGoal.frequency
            })
        }

    },[editForm, editingGoal])

    async function onCreateGoal(value:CreateGoalFormData) {
        setIsDialogOpen(false)

        const response = await createGoals(value)
        if(response.success){
            toast.success(response.message)
        }else {
            toast.error(response.message)
        }

        setTriggerRefresh(prev=>!prev)

    }

    async function onEditGoald(value:CreateGoalFormData) {
        setIsEditDialogOpen(false)

        const response = await updateGoals(value)
        if(response.success){
            toast.success(response.message)
        }else {
            console.log(response)
            toast.error(response.message)
        }

        setTriggerRefresh(prev=>!prev)

    }

    
    return { onCreateGoal, isEditDialogOpen, triggerRefresh, setIsEditDialogOpen, onEditGoald, editForm, editingGoal, setEditingGoal, form, isDialogOpen, setIsDialogOpen }
    
}