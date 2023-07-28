import { setFlashMessage } from '../lib/flash'
import { setCookie } from 'hono/cookie'
import { verifyTokenAndGetUser, generateJWT } from '../lib/magiclink'
import { authConfig } from '../lib/constants'

export const VerifyMagicLink = async (context) => {
  const token = context.req.query('token')
  const action = context.req.query('action')
  try {
    const user = await verifyTokenAndGetUser(context, token)
    const jwt = await generateJWT(user.uid, user.email)
    setCookie(context, authConfig.cookieName, jwt, { domain: authConfig.domain, path: '/', maxAge: authConfig.expiry, sameSite: 'Lax', httpOnly: true, secure: true })
    return context.redirect(authConfig.redirectTo)
  } catch (e) {
    console.log(e)
    setFlashMessage(context, 'Magic link is invalid or expired')
    return context.redirect(new URL(context.req.url).origin + '/' + action)
  }
}
