import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

export const setFlashMessage = (context, message) => {
  setCookie(context, 'flash', message, { path: '/', maxAge: 30, sameSite: 'Lax', httpOnly: true, secure: true })
}

export const getFlashMessage = (context) => {
  const message = getCookie(context, 'flash')
  deleteCookie(context, 'flash')
  return message
}
