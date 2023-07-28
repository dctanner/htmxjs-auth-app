import { html } from 'hono/html'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

// TODO move to htmxjs lib
export const setFlashMessage = (context, message) => {
  setCookie(context, 'flash', message, { path: '/', maxAge: 30, sameSite: 'Lax', httpOnly: true, secure: true })
}

export const getFlashMessage = (context) => {
  const message = getCookie(context, 'flash')
  deleteCookie(context, 'flash')
  return message
}

export const view = (viewToRender) => {
  return async (c) => {
    const newBody = await viewToRender({ context: c })
    return c.html(newBody)
  }
}

export const rootLayout = (layoutToApply) => {
  return async (c, next) => {
    await next()
    if (c.req.header('HX-Request') !== 'true') {
      // Req is a normal request, so we render the whole page which means adding the root layout
      const curBody = await c.res.text()
      c.res = undefined // To overwrite res, set it to undefined before setting new value https://github.com/honojs/hono/pull/970 released in https://github.com/honojs/hono/releases/tag/v3.1.0
      const newBody = await layoutToApply({ context: c, children: html(curBody) })
      c.res = c.html(newBody)
    }
    // Else do nothing and let the original response be sent
  }
}

export const layout = (layoutToApply) => {
  return async (c, next) => {
    await next()
    if ((c.req.header('HX-Request') === 'true' && (c.req.header('HX-Boosted') === 'true' || !c.req.header('HX-Target') || c.req.header('HX-Target') === "body" || c.req.header('HX-Target') === "#body")) || c.req.header('HX-Request') !== 'true') {
      // Req is regular req or boosted link, so we apply layouts
      const curBody = await c.res.text()
      c.res = undefined // To overwrite res, set it to undefined before setting new value https://github.com/honojs/hono/pull/970 released in https://github.com/honojs/hono/releases/tag/v3.1.0
      const newBody = await layoutToApply({ context: c, children: html(curBody) })
      c.res = c.html(newBody)
    }
    // Else do nothing and let the original response be sent, which will be a partial update applied to the page with hx-target
  }
}
