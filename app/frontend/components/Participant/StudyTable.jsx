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
      <TableCell colSpan={7} className="text-muted-foreground text-center">
        {nullStatement}
      </TableCell>
    </TableRow>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow className="hover:bg-transparent cursor-default">
        <TableHead>Study Name</TableHead>
        <TableHead>Methodologies</TableHead>
        <TableHead>Age Range</TableHead>
        <TableHead>Estimated Commitment</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Posted</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow
      className="even:bg-muted group relative hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => (window.location.href = `/p/studies/${study.id}`)}
    >
      <TableCell>{study.title}</TableCell>
      <TableCell>{displayMethodologies(study)}</TableCell>
      <TableCell>{ageRange(study)}</TableCell>
      <TableCell>{timeline(study)}</TableCell>
      <TableCell>{displayLocationShort(study)}</TableCell>
      <TableCell>{formatDate(study.created_at)}</TableCell>
    </TableRow>
  )

  return (
    <div className="rounded-md border">
      <Table>
        {studies.length > 0 && <TableHeaderRow />}
        <TableBody>
          {studies.length === 0 ? (
            <EmptyRow />
          ) : (
            studies.map(study => <StudySlice study={study} key={study.id} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudyTable
