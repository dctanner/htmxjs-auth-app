import { z } from 'zod'

// TODO verify email format
export const userSchema = z.object({
  email: z.string().min(1),
})
