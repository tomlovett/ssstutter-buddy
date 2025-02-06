import Basic from '../components/basic'

export default function Simple({ user }) {
  return (
    <>
      <Basic />
      <h3>Hola {user.first_name}</h3>
    </>
  )
}
