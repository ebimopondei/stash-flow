import { z } from "zod";

export const createGoalSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title too short!'),
  description: z.string(),
  targetAmount: z.string(),
  savedAmount: z.string().optional(),
  deadline: z.string(),
  category: z.string(),
  frequency: z.string(),
  isLocked: z.boolean().optional(),
  status: z.enum(['active', 'completed', 'cancelled']).optional(),

})

export type CreateGoalFormData = z.infer<typeof createGoalSchema>;