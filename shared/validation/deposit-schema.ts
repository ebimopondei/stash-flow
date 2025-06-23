import { z } from "zod"

export const depositSechema = z.object( {
    amount: z.string()
})

export type DepositSchema = z.infer<typeof depositSechema>