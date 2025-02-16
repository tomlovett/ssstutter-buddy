const ParticipantHome = ({
  participant,
  study_invitations,
  connections,
  nearby_studies,
}) => {
  const StudySlice = ({ study }) => <p>{study.title}</p>

  return (
    <div>
      <h3>Welcome, {participant.user.first_name}!</h3>

      <h5>Your Invitations</h5>
      {study_invitations.length == 0
        ? 'You have no pending invitations'
        : study_invitations.map(({ study }) => (
            <StudySlice study={study} key={study.id} />
          ))}
      <br />

      <h5>Your Connections</h5>
      {connections.length == 0
        ? 'You have no active connections'
        : connections.map(({ study }) => (
            <StudySlice study={study} key={study.id} />
          ))}
      <br />

      <h5>Studies Near You</h5>
      {nearby_studies.length == 0
        ? 'There are no active studies near you /n Consider expanding your default distance'
        : nearby_studies.map(study => (
            <StudySlice study={study} key={study.id} />
          ))}
      <br />

      <a href="#">View All Fully-Online Studies</a>
    </div>
  )
}

export default ParticipantHome
