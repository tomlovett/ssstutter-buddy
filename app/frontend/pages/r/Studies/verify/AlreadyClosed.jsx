const AlreadyClosed = ({ study }) => {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h1 className="text-2xl font-bold text-orange-800 mb-4">Study Already Closed</h1>
                <p className="text-gray-700 mb-2">
                    The study <strong>{study.title}</strong> is already closed.
                </p>
                <p className="text-gray-700">
                    You can reopen your study by visiting the <a href={`/r/studies/${study.id}`} className="text-blue-600 underline">study page</a>.
                </p>
            </div>
        </div>
    )
}

export default AlreadyClosed
