export default function show({ user }) {
  return (
    <div>
      <h3>Hola Muchacho</h3>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <br />
      <p>Email: {user.email}</p>
      <br />
    </div>
  )
}
