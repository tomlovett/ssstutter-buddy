import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'

const formatDate = dateObj =>
  dateObj ? new Date(dateObj).toDateString().slice(3, -4) : '---'

const StudyTable = ({ studies, nullStatement }) => {
  const EmptyTable = () => (
    <TableBody>
      <TableRow>
        <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
      </TableRow>
    </TableBody>
  )

  const HeaderRow = () => (
    <TableHeader>
      <TableRow className="hover:bg-transparent cursor-default">
        <TableHead>Study Name</TableHead>
        <TableHead>Published</TableHead>
        <TableHead>Paused</TableHead>
        <TableHead>Closed</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow
      className="even:bg-muted group relative hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => (window.location.href = `/r/studies/${study.id}`)}
    >
      <TableCell>{study.title}</TableCell>
      <TableCell>{formatDate(study.published_at)}</TableCell>
      <TableCell>{formatDate(study.paused_at)}</TableCell>
      <TableCell>{formatDate(study.closed_at)}</TableCell>
    </TableRow>
  )

  return studies.length == 0 ? (
    <EmptyTable />
  ) : (
    <Table>
      <HeaderRow />
      <TableBody>
        {studies.map(study => (
          <StudySlice study={study} key={study.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export default StudyTable
