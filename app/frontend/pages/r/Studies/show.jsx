import {
  ageRange,
  displayLocation,
  displayRemuneration,
  timeline,
} from '@/lib/study'

const StudyShow = ({ study }) => (
  <>
    <h3>{study.title}</h3>
    <p key="short_desc">Short description: {study.short_desc}</p>
    <p key="long_desc">Long description: {study.long_desc}</p>
    <p key="study_type">Study type: {study.study_type}</p>
    <p key="location">Location: {displayLocation(study)}</p>
    <p key="timeline">Timeline: {timeline(study)}</p>
    <p key="ageRange">Age range: {ageRange(study)}</p>
    <p key="remuneration">Est. remuneration: {displayRemuneration(study)}</p>
  </>
)

export default StudyShow
