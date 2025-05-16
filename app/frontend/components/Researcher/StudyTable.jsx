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

  return (
    <div className="rounded-md border">
      <Table>
        <HeaderRow />
        <TableBody>
          {studies.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground text-center"
              >
                {nullStatement}
              </TableCell>
            </TableRow>
          ) : (
            studies.map(study => <StudySlice study={study} key={study.id} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudyTable
