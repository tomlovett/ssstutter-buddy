// import React, { useState } from 'react'
//
// const UserForm = ({ user }) => {
//   const [values, setValues] = useState(user || {})
//
//   const handleChange = (e) => {
//     const key = e.target.id
//     const { value } = e.target
//
//     setValues((values) => ({
//       ...values,
//       [key]: value,
//     }))
//   }
//
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // router.post('/post', values)
//     console.log('hooray!')
//   }
//
//   return (
//     <React.Fragment>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="title">First name:</label>
//         <input
//           id="firstName"
//           value={values.firstName}
//           onChange={handleChange}
//         />
//         <label htmlFor="title">Last name:</label>
//         <input id="lastName" value={values.lastName} onChange={handleChange} />
//         <label htmlFor="title">Email:</label>
//         <input id="email" value={values.email} onChange={handleChange} />
//         Note: If you are registering as a researcher, please use the email
//         associated with your institution to aid the SSStutterBuddy team in
//         verifying your identity.
//         <br />
//         <label htmlFor="body">Body:</label>
//         <input id="body" value={values.body} onChange={handleChange} />
//         <button type="submit">Next</button>
//       </form>
//     </React.Fragment>
//   )
// }
//
// export default UserForm
