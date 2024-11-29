import { Outlet } from 'react-router'

const LayoutWithAuth: React.FC = () => {
  return (
    <>
      <div>LayoutWithAuth</div>
      <Outlet />
    </>
  )
}

export default LayoutWithAuth
