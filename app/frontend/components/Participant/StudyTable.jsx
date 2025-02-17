import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'
import { ageRange, displayAddr, timeline } from '@/lib/study'

const formatDate = dateObj => new Date(dateObj).toDateString().slice(0, -4)

const StudyTable = ({
  studies,
  nullStatement,
  digital_only,
  digital_friendly,
}) => {
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
        <TableHead>Estimated Commitment</TableHead>
        <TableHead>Location</TableHead>
        {digital_only && <TableHead>Posted</TableHead>}
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow key={study.id} className="even:bg-muted">
      <TableCell>{study.title}</TableCell>
      <TableCell>{ageRange(study)}</TableCell>
      <TableCell>{timeline(study)}</TableCell>
      <TableCell>{displayAddr(study)}</TableCell>
      {digital_only && (
        <TableCell>{formatDate(study.created_at)}</TableCell>
      )}
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
