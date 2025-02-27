import { formatBirthday, formatLocation } from '@/lib/utils'

const ParticipantShow = ({ participant }) => (
  <>
    <h3>Your profile</h3>

    <p>
      {participant.first_name} {participant.last_name}
    </p>
    <p>{participant.email}</p>

    <p>Codename: {participant.codename}</p>

    <p>Birthday: {formatBirthday(participant.birthdate)}</p>

    <p>
      Location:{' '}
      {formatLocation(participant.country, participant.state, participant.city)}
    </p>

    <p>Default distance setting: {participant.default_distance} miles</p>

    <p>how researchers see you</p>
    <p>Researcher/ParticipantSlice participant=participant</p>

    <a href="#">edit my info</a>
  </>
)

export default ParticipantShow
