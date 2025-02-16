const ResearcherHome = ({ researcher, studies, active_connections }) => {
  const StudySlice = ({ study }) => (
    <>
      <p>
        {study.title} -- green: study.active_connections.count blue:
        study.completed_connections.count {study.open_date}-{study.close_date}
      </p>
    </>
  )

  const ConnectionSlice = ({ connection }) => (
    <>
      <p>
        Participant.display_name -- connection.status -- most recent timestamp
      </p>
    </>
  )

  return (
    <div>
      <h3>Researcher Home Page</h3>

      <button onClick={() => {}}>New Study</button>

      <h5>Active Studies</h5>
      {studies.length == 0
        ? "You don't have any active studies"
        : studies.map(study => <StudySlice study={study} key={study.id} />)}
      <br />

      <h5>Active Connections</h5>
      {active_connections.length == 0
        ? "You don't have any active connections"
        : active_connections.map(connection => (
            <ConnectionSlice connection={connection} key={connection.id} />
          ))}
    </div>
  )
}

export default ResearcherHome
