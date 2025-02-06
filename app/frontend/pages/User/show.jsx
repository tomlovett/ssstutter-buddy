import { useState } from 'react'

export default ({ user }) => {
  const [email, setEmail] = useState(user.email)

  return (
    <div>
      <h3>Hola Muchacho</h3>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <br />
      <p>Email: {email}</p>
      <br />
    </div>
  )
}
