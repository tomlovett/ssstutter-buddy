import Basic from '../components/basic'

const Simple = ({ user }) => (
  <>
    <Basic />
    <h3>Hola {user.first_name}</h3>
  </>
)

export default Simple
