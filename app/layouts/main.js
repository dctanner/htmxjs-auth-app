/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { getFlashMessage } from '../lib/flash'

const MainLayout = ({ context, children }) => {
  const flashMessage = getFlashMessage(context)

  return (
    <div class="text-center">
      {/* TODO make My App a Worker env var */}
      <h1 class="mt-20 mb-12 text-4xl font-bold text-gray-800">My App</h1>
      <div id="island" class="mx-auto mb-8 w-full md:max-w-sm px-7 py-10 overflow-hidden bg-white md:rounded-lg shadow-xl">
        {flashMessage && (
          <div class="text-sm text-red-600 font-semibold px-4 py-2 -mt-4 mb-5 rounded-lg bg-red-50">
            {flashMessage}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default MainLayout
