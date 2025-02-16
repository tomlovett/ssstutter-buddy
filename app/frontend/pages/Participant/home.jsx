import StudyList from 'components/StudyList'

const ParticipantHome = ({
  participant,
  study_invitations,
  connections,
  nearby_studies,
}) => {
  return (
    <div>
      <h3>Welcome, {participant.user.first_name}!</h3>

      <h5>Your Invitations</h5>
      <StudyList
        studies={study_invitations.map(c => c.study)}
        nullStatement={'You have no pending invitations'}
      />
      <br />

      <h5>Your Connections</h5>
      <StudyList
        studies={connections.map(c => c.study)}
        nullStatement={'You have no active connections'}
      />
      <br />

      <h5>Studies Near You</h5>
      <StudyList
        studies={nearby_studies}
        nullStatement={
          'There are no active studies near you /n If this continues, consider expanding your default distance'
        }
      />
      <br />

      <a href="#">View All Fully-Online Studies</a>
    </div>
  )
}

export default ParticipantHome
