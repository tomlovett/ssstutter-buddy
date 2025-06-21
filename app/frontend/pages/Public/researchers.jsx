const Researchers = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">For Researchers</h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect directly with PWS who are interested in participating in
            studies
          </p>
          <div className="mt-8 text-left max-w-3xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  How it works
                </h3>
                <div className="mt-4 text-gray-600">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Post your study with details about its location,
                      methodologies, and other relevant information
                    </li>
                    <li>
                      If your study is conducted in-person, SSStutterBuddy will
                      send invitations to Participants within 100 miles of your
                      location
                    </li>
                    <li>
                      If your study is conducted online, it will be posted in
                      the \"Digital-Friendly\" section, and will be included in
                      the weekly digest of online studies
                    </li>
                    <li>
                      If a Participant expresses interest in your study,
                      SSStutterBuddy will send and email connecting the two of
                      you
                    </li>
                    <li>
                      You arrange study completion directly with the Participant
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  SSStutterBuddy has several built-in features to combat
                  respondent fraud
                </h3>
                <div className="mt-4 text-gray-600">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Participants will have badges on their profile with the
                      number of in-person and online studies they have completed
                    </li>
                    <li>
                      Each study connection comes with an auto-generated
                      six-digit PIN. You can ask Participants to share that PIN
                      when they complete an online study, reducing the potential
                      for one individual to fill out a survey multiple times
                    </li>
                    <li>
                      You can report suspicious activity to SSStutterBuddy, and
                      we will investigate their behavior on the platform
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Researchers
