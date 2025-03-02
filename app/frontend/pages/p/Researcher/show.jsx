import StudyTable from '@/components/Participant/StudyTable'

const ResearcherShow = ({ researcher }) => {
  return (
    <>
      <h3>{researcher.professional_name}</h3>
      <h5>Headshot</h5>

      <p>Institution: {researcher.institution}</p>

      <h4>Research interests</h4>
      <p>{researcher.research_interests}</p>

      <h4>Bio</h4>
      <p>{researcher.bio}</p>

      <h4>Studies</h4>
      <StudyTable
        studies={researcher.studies}
        nullStatement="This researcher has not posted any studies yet."
      />
      {/* Color-code active/commpleted  */}
    </>
  )
}

export default ResearcherShow
