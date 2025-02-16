import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'

const formatDate = dateObj => new Date(dateObj).toDateString().slice(0, -4)

const StudyTable = ({ studies, nullStatement }) => {
  const EmptyRow = () => (
    <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
  )

  const StudySlice = ({ study }) => (
    <TableRow key={study.id} className="even:bg-muted">
      <TableCell>{study.title}</TableCell>
      <TableCell className="font-medium">{study.age_range}</TableCell>
      <TableCell>{study.duration}</TableCell>
      <TableCell className="text-right">{study.distance}</TableCell>
    </TableRow>
  )

  return (
    <Table>
      <TableBody w-full>
        {studies.length == 0 ? (
          <EmptyRow />
        ) : (
          studies.map(study => <StudySlice study={study} key={study.id} />)
        )}
      </TableBody>
    </Table>
  )
}

export default StudyTable
