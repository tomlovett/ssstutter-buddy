import StudyTable from 'components/Participant/StudyTable'

const DigitalStudies = ({ studies }) => (
  <>
    <h4 className="underline">Digital-Friendly Studies</h4>
    <StudyTable
      studies={studies}
      nullStatement={
        'There are currently no digital studies, or you have already connected to all of them'
      }
      onlyDigital
    />
    <br />

    <a href="#">Link back to home</a>
  </>
)

export default DigitalStudies
