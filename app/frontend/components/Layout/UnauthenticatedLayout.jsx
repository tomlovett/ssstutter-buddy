import { Outlet } from 'react-router-dom'

const UnauthenticatedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default UnauthenticatedLayout
