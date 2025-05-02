import PublicFooter from '@/components/Layout/PublicFooter'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to SSStutterBuddy
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            SSStutterBuddy is a free, non-profit platform that connects
            researchers with People Who Stutter (PWS)
          </p>
          <div className="mt-8 text-left max-w-3xl mx-auto">
            <p className="text-gray-600">
              You might be surprised, but the biggest impediment to stuttering
              research is usually not funding, research ideas, even technology —
              it\'s finding enough PWS to participate in the study!
            </p>
            <p className="mt-4 text-gray-600">
              If you or your child have a stutter,{' '}
              <b>you can support hard-working researchers</b> as they advance
              our knowledge of stuttering\'s causes, expression, and treatment
              by particiating in studies.
            </p>
            <p className="mt-4 text-gray-600">
              As a nice bonus, most studies compensate participants for their
              time and effort. So you can{' '}
              <b>do a good deed and get paid for it as well!</b>
            </p>
            <p className="mt-4 text-gray-600">
              SSStutterBuddy is entirely free-to-use for both researchers and
              PWS. We\'re not here to make money,{' '}
              <b>we\'re here to make a difference</b>
            </p>
            <p className="mt-4 text-gray-600 text-center text-lg underline">
              SSStutterBuddy launches Summer 2025
            </p>
            <br />
            <p className="mt-4 text-gray-600 text-center">
              Fill out this brief{' '}
              <a
                href="https://forms.gle/iYjiV8Uzc9oQMAeS8"
                className="hover:text-gray-900"
              >
                Google Form
              </a>{' '}
              to get notified when we launch. Or, read more below.
            </p>
          </div>
          <br />
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default Home
