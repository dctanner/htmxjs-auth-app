/** @jsx jsx */
import { jsx } from 'hono/jsx'

export const FormErrorText = ({ children }) => {
  return (
    <p class="text-sm text-red-500 font-semibold mt-1">
      {children?.join(" ")}
    </p>
  )
}
