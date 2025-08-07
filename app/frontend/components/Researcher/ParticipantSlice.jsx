import React from 'react'

const ParticipantSlice = ({ participant, showFullInfo = false }) => (
  <table className="w-full text-left">
    <thead>
      <tr>
        <th className="px-4 py-2 text-gray-600 w-1/3">Name</th>
        <th className="px-4 py-2 text-gray-600 w-1/3">Email</th>
        <th className="px-4 py-2 text-gray-600 w-1/8">Age</th>
        <th className="px-4 py-2 text-gray-600 w-1/8">Gender</th>
        <th className="px-4 py-2 text-gray-600 w-1/8">Distance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-2 text-gray-600">
          {showFullInfo ? (
            `${participant.first_name} ${participant.last_name}`
          ) : (
            <i>{participant.codename}</i>
          )}
        </td>
        <td className="px-4 py-2 text-gray-600">{showFullInfo ? participant.email : ''}</td>
        <td className="px-4 py-2 text-gray-600">b. {participant.birthdate.slice(0, 4)}</td>
        <td className="px-4 py-2 text-gray-600">{participant.gender.toUpperCase()}</td>
        <td className="px-4 py-2 text-gray-600">37 mi</td>
      </tr>
    </tbody>
  </table>
)

export default ParticipantSlice
