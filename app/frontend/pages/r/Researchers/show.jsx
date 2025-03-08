const ResearcherShow = ({ researcher }) => (
  <>
    <p>{researcher.professional_name}</p>
    <p>Institution: {researcher.institution}</p>
    <p>Research interests: {researcher.research_interests}</p>
    <p>University profile url: {researcher.university_profile_url}</p>
  </>
)

export default ResearcherShow
