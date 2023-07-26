import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmljs'
import AppLayout from './layouts/app'
import IslandLayout from './layouts/island'
import { LoginView } from './routes/login'
import { SignupView } from './routes/signup'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.use('*', layout(IslandLayout))
app.get('/login', view(LoginView))
app.get('/signup', view(SignupView))

export default app