import { Link } from '@inertiajs/react'

const ResearcherShow = ({ user, researcher }) => (
  <div className="container mx-auto px-4 py-8">
    <h3 className="text-2xl font-bold mb-4">{researcher.professional_name}</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <p className="mb-4 ml-2">
          <Link href={researcher.university_profile_url} target="_blank">
            {researcher.institution}
          </Link>
        </p>
        <h3 className="text-lg mb-2">Research interests</h3>
        <p className="mb-4 ml-2">{researcher.research_interests}</p>
        <h3 className="text-lg mb-2">Biography</h3>
        <p className="mb-4 ml-2">{researcher.bio}</p>
      </div>
      <div>
        <img
          src={researcher.headshot_url}
          alt="Headshot"
          className="w-full max-w-[500px] object-contain rounded-md"
        />
      </div>
    </div>
    <div className="h-10" />
    {user.researcher.id === researcher.id && (
      <Link
        href={`/r/researchers/${researcher.id}/edit`}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Edit my Researcher Profile
      </Link>
    )}
  </div>
)

export default ResearcherShow
