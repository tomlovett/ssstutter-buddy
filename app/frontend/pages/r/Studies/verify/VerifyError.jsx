const VerifyError = ({ error }) => (
  <div className="space-y-6 max-w-2xl mx-auto">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h1 className="text-2xl font-bold text-red-800 mb-4">Verification Failed</h1>
      <p className="text-gray-700 mb-2">{error || 'There was an error processing your request.'}</p>
      <p className="text-gray-700 text-sm">
        The verification link may have expired or is invalid. Please check your email for a current
        verification link.
      </p>
      <p>
        To verify the status of your study, please <a href={`/r/studies/${study.id}`}>click here</a>.
      </p>
    </div>
  </div>
)

export default VerifyError
