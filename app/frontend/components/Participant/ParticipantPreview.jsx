import ParticipantSlice from '@/components/Researcher/ParticipantSlice'

const ParticipantPreview = ({ participant }) => (
  <div>
    <h2 className="text-lg font-medium text-gray-900 mb-4">How researchers see you</h2>
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-gray-600 mb-1">
        If you <i>have not</i> connected with one of the researcher's studies
      </p>

      <div className="bg-white border border-gray-200 rounded-md p-4">
        <ParticipantSlice participant={participant} showFullInfo={false} />
      </div>

      <br />
      <p className="text-gray-600 mb-1">
        When you <i>have</i> connected with the researcher
      </p>
      <div className="bg-white border border-gray-200 rounded-md p-4">
        <ParticipantSlice participant={participant} showFullInfo />
      </div>
    </div>
  </div>
)

export default ParticipantPreview
