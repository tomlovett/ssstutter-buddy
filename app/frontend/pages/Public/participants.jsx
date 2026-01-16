import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PublicFooter from '@/components/Layout/PublicFooter'

const Participants = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-slate-900">
            For People Who Stutter (PWS)
          </h1>
          <p className="mt-4 text-xl text-slate-600 font-sans">
            Participate in studies and contribute to meaningful research
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">How does it work?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-sans">
                <li>Create an account using your name, email, and town of residence</li>
                <li>Researchers post studies they are conducting that need participants</li>
                <li>Browse available studies and connect with those that interest you</li>
                <li>When a new study is posted near you, you will receive an email</li>
                <li>
                  When you express interest in a study, SSStutterBuddy will send an email to you and the
                  researcher
                </li>
                <li>You coordinate with the researcher to set a time to complete the study</li>
                <li>You complete the study and receive compensation for your time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Why should I participate in studies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-600 font-sans">
                There are many reasons to participate in research studies on stuttering:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-sans">
                <li>Have an interesting experience</li>
                <li>Give back to the stuttering community</li>
                <li>Help advance stuttering research</li>
                <li>Receive free treatment or speech therapy</li>
                <li>Earn a few bucks</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}

export default Participants
