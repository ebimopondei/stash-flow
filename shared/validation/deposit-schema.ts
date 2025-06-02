import { z } from "zod"

export const depositSechema = z.object( {
    amount: z.string(),
    email: z.string().email('Invalid email format').optional(),
    reference: z.string().optional(),
    publicKey: z.string().optional(),
    userId: z.string().optional()

})

export type DepositSchema = z.infer<typeof depositSechema>