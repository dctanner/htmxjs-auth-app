import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmljs'
import AppLayout from './layouts/app'
import MainLayout from './layouts/main'
import { LoginView, LoginPost } from './routes/login'
import { SignupView, SignupPost } from './routes/signup'
import { VerifyMagicLink } from './routes/verify'

const app = new Hono()

app.get('/verify', VerifyMagicLink) // Note we don't use view() here and also avoid all layouts, as we want to do a an immediate redirect without loading the app if the login token is valid.
app.use('*', rootLayout(AppLayout))
app.use('*', layout(MainLayout))
app.get('/login', view(LoginView))
app.post('/login', view(LoginPost))
app.get('/signup', view(SignupView))
app.post('/signup', view(SignupPost))

export default app
