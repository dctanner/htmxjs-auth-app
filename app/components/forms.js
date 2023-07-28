/** @jsx jsx */
import { jsx } from 'hono/jsx'

export const FormErrorText = ({ children }) => {
  return (
    <p class="text-sm text-red-500 font-semibold -mt-2 mb-2">
      {children?.join(" ")}
    </p>
  )
}
