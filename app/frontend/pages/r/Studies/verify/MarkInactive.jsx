const MarkInactive = ({ study }) => (
  <div className="space-y-6 max-w-2xl mx-auto">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Study Marked as Inactive</h1>
      <p className="text-black-700 mb-2">
        Thank you for updating the status of <strong>{study.title}</strong>.
      </p>
      <p className="text-black-700">
        Your study has been marked as no longer accepting participants and is now closed.
      </p>
      <p className="text-black-700">
        To reopen your study, please edit the study{' '}
        <a href={`/r/studies/${study.id}/edit`} className="text-blue-600 underline">
          here
        </a>
        .
      </p>
    </div>
  </div>
)

export default MarkInactive
