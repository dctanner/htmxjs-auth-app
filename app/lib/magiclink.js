import { v4 as uuidv4 } from 'uuid'
import { sendSignupMagicLinkEmail, sendLoginMagicLinkEmail } from './emails'

export const generateAndSendMagicLink = async (origin, email, token) => {
  const user = await context.env.DB.prepare("SELECT * FROM users WHERE email=?").get(email)
  if (!user) return false // If this is a login and they don't exist we just silently don't send a link
  const token = uuidv4()
  await context.env.DB.prepare("INSERT INTO user_tokens (email, token) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET token=?, created_at=(DATETIME('now')").bind(email, token, token).run()
  if (user.verified === 1) {
    await sendSignupMagicLinkEmail(email, `${origin}/verify?token=${token}`)
  } else {
    await sendLoginMagicLinkEmail(email, `${origin}/verify?token=${token}`)
  }
  return true
}

export const verifyTokenAndGetUser = async (token) => {
  const userToken = await context.env.DB.prepare("SELECT * FROM user_tokens WHERE token=?").get(token)
  // TODO handle expired tokens. Set token expiry hours in env, check against user_tokens.created_at
  if (!userToken) return false
  await context.env.DB.prepare("DELETE FROM user_tokens WHERE token=?").bind(token).run()
  const user = await context.env.DB.prepare("SELECT * FROM users WHERE email=?").get(userToken.email)
  if (!user) return false
  if (user.verified === 0) {
    await context.env.DB.prepare("UPDATE users SET verified=1 WHERE email=?").bind(user.email).run()
  }
  return user
}
