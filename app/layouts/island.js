/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

const IslandLayout = async ({ context, children }) => {
  return (
    <div class="text-center">
      {/* TODO make My App a Worker env var */}
      <h1 class="mt-20 mb-12 text-4xl font-bold text-gray-800">My App</h1>
      <div class="mx-auto w-full md:max-w-sm px-7 py-10 overflow-hidden bg-white md:rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  )
}

export default IslandLayout
