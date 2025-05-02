import PublicFooter from '@/components/Layout/PublicFooter'

const Participants = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            For People Who Stutter (PWS)
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Participate in studies and contribute to meaningful research
          </p>
          <div className="mt-8 text-left max-w-3xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  How does it work?
                </h3>
                <div className="mt-4 text-gray-600">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Create an account using your name, email, and town of
                      residence
                    </li>
                    <li>
                      Researchers post studies they are conducting that need
                      participants
                    </li>
                    <li>
                      Browse available studies and connect with those that
                      interest you
                    </li>
                    <li>
                      When a new study is posted near you, you will receive an
                      email
                    </li>
                    <li>
                      When you express interest in a study, SSStutterBuddy will
                      send an email to you and the researcher
                    </li>
                    <li>
                      You coordinate with the researcher to set a time to
                      complete the study
                    </li>
                    <li>
                      You complete the study and receive compensation for your
                      time
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Why should I participate in studies?
                </h3>
                <div className="mt-4 text-gray-600">
                  <p className="mb-4">
                    There are many reasons to participate in research studies on
                    stuttering
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Have an interesting experience</li>
                    <li>Give back to the stuttering community</li>
                    <li>Help advance stuttering research</li>
                    <li>Receive free treatment or speech therapy</li>
                    <li>Earn a few bucks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default Participants
