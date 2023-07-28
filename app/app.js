import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmljs'
import AppLayout from './layouts/app'
import IslandLayout from './layouts/island'
import { LoginView, LoginPost } from './routes/login'
import { SignupView, SignupPost } from './routes/signup'
import { VerifyPost } from './routes/verify'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.use('*', layout(IslandLayout))
app.get('/login', view(LoginView))
app.post('/login', view(LoginPost))
app.get('/signup', view(SignupView))
app.post('/signup', view(SignupPost))
app.post('/verify', view(VerifyPost))

export default app
