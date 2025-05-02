import PublicFooter from '@/components/Layout/PublicFooter'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            We are dedicated to facilitating meaningful research by connecting
            researchers with participants
          </p>
          <div className="mt-8 text-left max-w-3xl mx-auto">
            <p className="text-gray-600">
              Our platform serves as a bridge between researchers and
              participants, making it easier to conduct and participate in
              important studies. We believe in the power of research to improve
              lives and advance knowledge.
            </p>
            <p className="mt-4 text-gray-600">
              Whether you're a researcher looking to conduct studies or a
              participant interested in contributing to research, we provide the
              tools and support you need to make meaningful connections.
            </p>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default About
