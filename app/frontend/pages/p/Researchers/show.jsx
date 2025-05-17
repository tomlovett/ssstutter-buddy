import { Link } from '@inertiajs/react'
import StudyTable from '@/components/Participant/StudyTable'

const ResearcherShow = ({ researcher, studies }) => (
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
          className="w-full max-w-[350px] object-contain rounded-md"
        />
      </div>
    </div>
    <div className="h-10" />
    <section>
      <h3 className="text-lg font-bold mb-4">Studies from this Researcher</h3>
      <StudyTable
        studies={studies}
        nullStatement="This researcher has not posted any studies yet."
      />
    </section>
  </div>
)

export default ResearcherShow
