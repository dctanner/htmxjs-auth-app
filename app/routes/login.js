/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { FormErrorText } from '../components/forms'
import { generateAndSendMagicLink } from '../lib/magiclink'

export const LoginView = ({ context, values, errors }) => {
  return (
    <div class="flex flex-col">
      <h2 class="mb-8 text-2xl font-semibold text-center">Log in</h2>
      <form hx-post="/login" hx-target="#island">
        <input type="text" name="email" id="email" class="form-input-text" placeholder="Email address" value={values?.email} />
        <FormErrorText>{errors?.email}</FormErrorText>
        <div class="block">
          <button class="btn-lg-blue">Log in with email</button>
        </div>
      </form>
      <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="/signup" class="text-blue-500 underline">Sign up</a></p>
      {/* TODO add terms text and make link to terms an env var "By clicking continue, you agree to our Terms of Service and Privacy Policy. */}
    </div>
  )
}

export const LoginLinkSentView = ({ context }) => (
  <div class="flex flex-col">
    <h2 class="mb-8 text-2xl font-semibold text-center">Check your email</h2>
    <p>A magic login link has been sent to your email address..</p>
  </div>
)

export const LoginPost = async ({ context }) => {
  const formData = await context.req.parseBody()
  const parsed = userSchema.safeParse(formData)
  if (parsed.success) {
    await generateAndSendMagicLink(context, new URL(context.req.url).origin, parsed.data.email)
    return <LoginLinkSentView />
  } else {
    return <LoginView values={{ email: formData.email }} errors={parsed.error.flatten().fieldErrors} />
  }
}
