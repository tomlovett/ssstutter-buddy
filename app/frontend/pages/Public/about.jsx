import { Card, CardContent } from '@/components/ui/card'
import PublicFooter from '@/components/Layout/PublicFooter'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-slate-900">About Us</h1>
          <p className="mt-4 text-xl text-slate-600 font-sans">
            We are dedicated to facilitating meaningful research by connecting researchers with participants
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-4">
              <p className="text-slate-600 font-sans">
                Our platform serves as a bridge between researchers and participants, making it easier to
                conduct and participate in important studies. We believe in the power of research to improve
                lives and advance knowledge.
              </p>
              <p className="text-slate-600 font-sans">
                Whether you're a researcher looking to conduct studies or a participant interested in
                contributing to research, we provide the tools and support you need to make meaningful
                connections.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}

export default About
