const ConnectionIdex = ({ connections }) => (
  <>
    <h3>My Study Connections</h3>
    {connections.map(connection => (
      <div key={connection.id}>
        <p>{connection.study.title}</p>
        {/* connection status, researcher name, dates, do something? (email researcher?) */}
      </div>
    ))}
  </>
)

export default ConnectionIdex
