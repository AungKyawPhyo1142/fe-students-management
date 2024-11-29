type Props = {
  children: React.ReactNode
}

const LayoutWithoutAuth: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export default LayoutWithoutAuth
