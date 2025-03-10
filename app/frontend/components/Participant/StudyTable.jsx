import { Link } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'
import { ageRange, displayLocation, timeline } from '@/lib/study'
import { formatDate } from '@/lib/utils'

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
        <TableHead>Study Type</TableHead>
        <TableHead>Age Range</TableHead>
        <TableHead>Estimated Commitment</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Link</TableHead>
        <TableHead>Posted</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{study.title}</TableCell>
      <TableCell>{study.study_type}</TableCell>
      <TableCell>{ageRange(study)}</TableCell>
      <TableCell>{timeline(study)}</TableCell>
      <TableCell>{displayLocation(study)}</TableCell>
      <TableCell>
        <Link href={`/p/studies/${study.id}`}>
          <u>View</u>
        </Link>
      </TableCell>
      <TableCell>{formatDate(study.created_at)}</TableCell>
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
