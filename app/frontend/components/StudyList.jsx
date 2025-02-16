const formatDate = dateObj => new Date(dateObj).toDateString().slice(0, -4)

const StudyList = ({ studies, nullStatement }) => {
  if (studies.length == 0) {
    return <p>{nullStatement}</p>
  }

  const StudySlice = ({ study }) => (
    <p>
      {study.title}, {formatDate(study.open_date)} --{' '}
      {formatDate(study.close_date)}
    </p>
  )

  return (
    <>
      {studies.map(study => (
        <StudySlice study={study} key={study.id} />
      ))}
    </>
  )
}

export default StudyList
