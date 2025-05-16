import { Link } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'
import {
  ageRange,
  displayLocationShort,
  displayMethodologies,
  timeline,
} from '@/lib/study'
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
        <TableHead key="title">Study Name</TableHead>
        <TableHead key="methodologies">Methodologies</TableHead>
        <TableHead key="ageRange">Age Range</TableHead>
        <TableHead key="timeline">Estimated Commitment</TableHead>
        <TableHead key="location">Location</TableHead>
        <TableHead key="link">Link</TableHead>
        <TableHead key="posted">Posted</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow className="even:bg-muted">
      <TableCell key="title">{study.title}</TableCell>
      <TableCell key="methodologies">{displayMethodologies(study)}</TableCell>
      <TableCell key="ageRange">{ageRange(study)}</TableCell>
      <TableCell key="timeline">{timeline(study)}</TableCell>
      <TableCell key="location">{displayLocationShort(study)}</TableCell>
      <TableCell key="view">
        <Link href={`/p/studies/${study.id}`}>
          <u>View</u>
        </Link>
      </TableCell>
      <TableCell key="date">{formatDate(study.created_at)}</TableCell>
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
