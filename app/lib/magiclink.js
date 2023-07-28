import { v4 as uuidv4 } from 'uuid'
import { sendSignupVerifyEmail, sendLoginVerifyEmail } from './emails'

export const generateAndSendMagicLink = async (origin, email, token) => {
  const user = await context.env.DB.prepare("SELECT * FROM users WHERE email=?").get(email)
  if (!user) return false // If this is a login and they don't exist we just silently don't send a link
  const token = uuidv4()
  await context.env.DB.prepare("INSERT INTO user_tokens (email, token) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET token=?, created_at=(DATETIME('now')").bind(email, token, token).run()
  if (user.verified === 1) {
    await sendSignupVerifyEmail(email, `${origin}/verify?token=${token}`)
  } else {
    await sendLoginVerifyEmail(email, `${origin}/verify?token=${token}`)
  }
  return true
}
