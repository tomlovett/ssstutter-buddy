import { Link } from '@inertiajs/react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PublicFooter from '@/components/Layout/PublicFooter'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight font-display text-slate-900">
              Welcome to SSStutterBuddy
            </h1>
            <p className="text-xl text-slate-600 font-sans">
              SSStutterBuddy is a free, non-profit platform that connects researchers with People Who Stutter
              (PWS)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/signup">Sign up today!</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/p/digital-studies">View Studies</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/homepage-hero.jpg"
              alt="Connecting Research & Community"
              title="Sorry for using an AI image :/"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: We need YOU! */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">We need YOU!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 font-sans">
                You might be surprised, but the biggest impediment to stuttering research is usually not
                funding, research ideas, or even technology —{' '}
                <strong> it's finding enough PWS to participate in the study!</strong>
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Make an Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Make an Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 font-sans">
                If you or your child have a stutter, <strong>you can support hard-working researchers</strong>{' '}
                as they advance our knowledge of stuttering's causes, expression, and treatment by
                participating in studies.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Get Compensated */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Get Compensated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 font-sans">
                As a nice bonus, most studies compensate participants for their time and effort. So you can{' '}
                <strong>do a good deed and get paid for it as well!</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-6">
              <p className="text-slate-900 font-sans text-center">
                Don't have an account? You can still{' '}
                <Link
                  href="/p/digital-studies"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  view and connect with studies
                </Link>
                .
              </p>
              <p className="text-slate-600 font-sans text-center mt-4 text-sm">
                SSStutterBuddy is entirely free-to-use for both researchers and PWS. We're not here to make
                money, <strong>we're here to make a difference</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default Home
