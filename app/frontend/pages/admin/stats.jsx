export default function Stats({
  users_count,
  participants_count,
  researchers_count,
  published_studies_count,
  total_connections,
  completed_connections_count,
  digital_completed_connections_count,
  digital_only_studies_count,
  participants_by_country,
  studies_by_country,
  invitations_count,
  accepted_invitations_count,
}) {
  const LocationTable = ({ location_values }) => (
    <div className="mt-2 w-1/3">
      <table className="w-1/3 border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2">
        <tbody>
          {Object.entries(location_values).map(([country, count]) => (
            <tr key={country}>
              <td className="stats-label-cell">{country}</td>
              <td className="stats-number-cell">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">SSStutterBuddy Statistics</h1>
      <h3 className="text-md font-bold mb-4">
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h3>

      <table className="w-1/3 border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2">
        <tbody>
          <tr>
            <td className="stats-label-cell">Users</td>
            <td className="stats-number-cell">{users_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Participants</td>
            <td className="stats-number-cell">{participants_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Researchers</td>
            <td className="stats-number-cell">{researchers_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Published Studies</td>
            <td className="stats-number-cell">{published_studies_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Digital-Only Studies</td>
            <td className="stats-number-cell">{digital_only_studies_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Active Connections</td>
            <td className="stats-number-cell">{total_connections}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Completed Connections</td>
            <td className="stats-number-cell">{completed_connections_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Completed Digital Connections</td>
            <td className="stats-number-cell">
              {digital_completed_connections_count}
            </td>
          </tr>
          <tr>
            <td className="stats-label-cell">Invitations</td>
            <td className="stats-number-cell">{invitations_count}</td>
          </tr>
          <tr>
            <td className="stats-label-cell">Accepted Invitations</td>
            <td className="stats-number-cell">{accepted_invitations_count}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-md font-bold mt-4">Studies by Country</h3>
      <LocationTable location_values={studies_by_country} />

      <h3 className="text-md font-bold mt-4">Participants by Country</h3>
      <LocationTable location_values={participants_by_country} />
    </div>
  )
}
