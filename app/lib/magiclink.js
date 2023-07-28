import { v4 as uuidv4 } from 'uuid'
import * as jose from 'jose';
import { sendSignupMagicLinkEmail, sendLoginMagicLinkEmail } from './emails'
import { authConfig } from './constants';

export const generateAndSendMagicLink = async (context, origin, email) => {
  const user = await context.env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first()
  if (!user) return false // If this is a login and they don't exist we just silently don't send a link
  const token = uuidv4()
  await context.env.DB.prepare("INSERT INTO user_tokens (email, token) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET token=?, created_at=DATETIME('now')").bind(email, token, token).run()
  if (!user.verified) {
    await sendSignupMagicLinkEmail(context, email, `${origin}/verify?token=${token}`)
  } else {
    await sendLoginMagicLinkEmail(context, email, `${origin}/verify?token=${token}`)
  }
  return true
}

export const verifyTokenAndGetUser = async (context, token) => {
  const userToken = await context.env.DB.prepare("SELECT * FROM user_tokens WHERE token=?").bind(token).first()
  // TODO handle expired tokens. Set token expiry hours in env, check against user_tokens.created_at
  if (!userToken) throw new Error('Token not found');
  await context.env.DB.prepare("DELETE FROM user_tokens WHERE token=?").bind(token).run()
  const user = await context.env.DB.prepare("SELECT * FROM users WHERE email=?").bind(userToken.email).first()
  if (!user) throw new Error('User not found');
  if (!user.verified) await context.env.DB.prepare("UPDATE users SET verified=1 WHERE email=?").bind(user.email).run()
  return user
}

export const generateJWT = async (uid, email) => {
  const secret = new TextEncoder().encode(config.secretKey)
  const alg = 'HS256'
  const jwt = await new jose.SignJWT({ uid, email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(authConfig.issuer)
    .setAudience(authConfig.audience)
    .setExpirationTime(authConfig.expiry)
    .sign(secret)
  console.log('jwt', jwt)
  return jwt
}
