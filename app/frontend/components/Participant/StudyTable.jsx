import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'
import { ageRange, shortAddr, timeline } from '@/lib/study'

const formatDate = dateObj => new Date(dateObj).toDateString().slice(0, -4)

const StudyTable = ({ studies, nullStatement }) => {
  const EmptyRow = () => (
    <TableRow>
      <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
    </TableRow>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow>
        <TableHead>Study Name</TableHead>
        <TableHead>Age Range</TableHead>
        <TableHead>Commitment</TableHead>
        <TableHead>Location</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow key={study.id} className="even:bg-muted">
      <TableCell>{study.title}</TableCell>
      <TableCell>{ageRange(study)}</TableCell>
      <TableCell>{timeline(study)}</TableCell>
      <TableCell>{shortAddr(study)}</TableCell>
    </TableRow>
  )

  return (
    <Table>
      {studies.length > 0 && <TableHeaderRow />}
      <TableBody>
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
