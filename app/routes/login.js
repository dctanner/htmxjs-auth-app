/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

export const LoginView = ({ context }) => {
  return (
    <div class="flex flex-col">
      <h2 class="mb-8 text-2xl font-semibold text-center">Log in</h2>
      <input type="text" name="email" id="email" class="form-input-text" placeholder="Email address" />
      <div class="block">
        <button class="btn-lg-blue">Log in with email</button>
      </div>
      <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="/signup" class="text-blue-500 underline">Sign up</a></p>
      {/* TODO add terms text and make link to terms an env var "By clicking continue, you agree to our Terms of Service and Privacy Policy. */}
    </div>
  )
}
