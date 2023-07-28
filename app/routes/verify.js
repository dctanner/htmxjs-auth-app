/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { setFlashMessage } from '../../htmljs'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
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
    setFlashMessage(context, 'Magic link is either invalid or expired, please try again.')
    return context.redirect(new URL(context.req.url).origin + '/' + action)
  }
}

const InvalidMagicLinkView = () => (
  <div class="flex flex-col">
    <h2 class="mb-8 text-2xl font-semibold text-center">Invalid magic link</h2>
    <p>This magic link is either invalid or expired. Please <a href="/login">login</a> or <a href="/signup">signup</a> again.</p>
  </div>
)
