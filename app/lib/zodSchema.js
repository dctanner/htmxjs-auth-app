import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1),
})
