const VerifyActive = ({ study }) => {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h1 className="text-2xl font-bold text-green-800 mb-4">Study Status Confirmed</h1>
                <p className="text-gray-700 mb-2">
                    Thank you for confirming that <strong>{study.title}</strong> is still accepting participants.
                </p>
                <p className="text-gray-700">
                    Your study will remain active on SSStutterBuddy.
                </p>
            </div>
        </div>
    )
}

export default VerifyActive
