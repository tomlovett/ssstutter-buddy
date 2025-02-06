import { useState } from 'react'

const Show = ({ user }) => {
  const [counter, setCounter] = useState(0)

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

export default Show
