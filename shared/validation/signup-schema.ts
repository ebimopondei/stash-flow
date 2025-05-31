import { z } from "zod";


export const signupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email('Enter valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signupSchema>;


export const createGoalSchema = z.object({
  title: z.string().min(3, 'Title too short!'),
  description: z.string(),
  targetAmount: z.string(),
  savedAmount: z.number().optional(),
  deadline: z.string(),
  category: z.string(),
  frequency: z.string(),
  isLocked: z.boolean().optional(),
  status: z.enum(['active', 'completed', 'cancelled']).optional(),

})

export type CreateGoalFormData = z.infer<typeof createGoalSchema>;


export const loginSchema = z.object( {
    email: z.string(),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})

export type LoginSchema = z.infer<typeof loginSchema>