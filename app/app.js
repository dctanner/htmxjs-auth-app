import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmljs'
import AppLayout from './layouts/app'
import IslandLayout from './layouts/island'
import { LoginView, LoginPost, LoginLinkSentView } from './routes/login'
import { SignupView, SignupPost, SignupLinkSentView } from './routes/signup'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.use('*', layout(IslandLayout))
app.get('/login', view(LoginView))
app.post('/login', view(LoginPost))
app.get('/login-link', view(LoginLinkSentView))
app.get('/signup', view(SignupView))
app.post('/signup', view(SignupPost))
app.get('/signup-link', view(SignupLinkSentView))

export default app
