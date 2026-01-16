import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PublicFooter from '@/components/Layout/PublicFooter'

const Researchers = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-slate-900">
            For Researchers
          </h1>
          <p className="mt-4 text-xl text-slate-600 font-sans">
            Connect directly with PWS who are interested in participating in studies
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-sans">
                <li>
                  Post your study with details about its location, methodologies, and other relevant
                  information
                </li>
                <li>
                  If your study is conducted in-person, SSStutterBuddy will send invitations to Participants
                  within 100 miles of your location
                </li>
                <li>
                  If your study is conducted online, it will be posted in the "Digital-Friendly" section, and
                  will be included in the weekly digest of online studies
                </li>
                <li>
                  If a Participant expresses interest in your study, SSStutterBuddy will send an email
                  connecting the two of you
                </li>
                <li>You arrange study completion directly with the Participant</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">
                SSStutterBuddy has several built-in features to combat respondent fraud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-sans">
                <li>
                  Participants will have badges on their profile with the number of in-person and online
                  studies they have completed
                </li>
                <li>
                  Each study connection comes with an auto-generated six-digit PIN. You can ask Participants
                  to share that PIN when they complete an online study, reducing the potential for one
                  individual to fill out a survey multiple times
                </li>
                <li>
                  You can report suspicious activity to SSStutterBuddy, and we will investigate their behavior
                  on the platform
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}

export default Researchers
