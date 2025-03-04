const ConnectionIdex = ({ connections }) => (
  <>
    <h3>My Study Connections</h3>
    {connections.map(connection => (
      <>
        <p>{connection.study.title}</p>
        {/* connection status, researcher name, dates, do something? (email researcher?) */}
      </>
    ))}
  </>
)

export default ConnectionIdex
