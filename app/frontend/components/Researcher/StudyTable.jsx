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
  const formattedDates = ({ open_date, close_date }) =>
    `${formatDate(open_date)} -- ${formatDate(close_date)}`

  const EmptyRow = () => (
    <TableRow>
      <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
    </TableRow>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow>
        <TableHead>Study Name</TableHead>
        <TableHead>Active Connections</TableHead>
        <TableHead>Completed Connections</TableHead>
        <TableHead>Study Dates</TableHead>
      </TableRow>
    </TableHeader>
  )

  const StudySlice = ({ study }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{study.title}</TableCell>
      <TableCell>study connections count</TableCell>
      <TableCell>completed connections</TableCell>
      <TableCell>{formattedDates(study)}</TableCell>
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
