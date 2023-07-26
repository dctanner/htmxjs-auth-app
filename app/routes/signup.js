/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { userSchema } from '../lib/zodSchema'
import { FormErrorText } from '../components/forms'

export const SignupView = ({ context, errors }) => {
  return (
    <div class="flex flex-col">
      <h2 class="mb-8 text-2xl font-semibold text-center">Sign up</h2>
      <form hx-post="/signup" hx-target="#island">
        <input type="text" name="email" id="email" class="form-input-text" placeholder="Email address" />
        <FormErrorText>{errors?.name}</FormErrorText>
        <div class="block">
          <button class="btn-lg-blue">Sign up with email</button>
        </div>
      </form>
      <p class="w-full mt-4 text-sm text-center text-gray-500">Already have an account? <a href="/login" class="text-blue-500 underline">Log in</a></p>
      {/* TODO add terms text and make link to terms an env var "By clicking continue, you agree to our Terms of Service and Privacy Policy. */}
    </div>
  )
}

export const VerifyEmailSentView = ({ context, email }) => (
  <div class="flex flex-col">
    <h2 class="mb-8 text-2xl font-semibold text-center">Confirm your email address</h2>
    <p>A verification email has been sent. Please check your email to
      confirm your account.</p>
  </div>
)

export const SignupPost = async ({ context }) => {
  const formData = await context.req.parseBody()
  const parsed = userSchema.safeParse(formData)
  if (parsed.success) {
    await context.env.DB.prepare("INSERT INTO users (email) VALUES (?)").bind(parsed.data.email).run()
    return <VerifyEmailSentView email={parsed.data.email} />
  } else {
    return <SignupView email={parsed.data.email} errors={parsed.error.flatten().fieldErrors} />
  }
}
