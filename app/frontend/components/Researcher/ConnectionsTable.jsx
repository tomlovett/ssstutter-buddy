import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'

const formatDate = dateObj => new Date(dateObj).toDateString().slice(0, -4)

const ConnectionsTable = ({ connections, nullStatement }) => {
  const EmptyRow = () => (
    <TableRow>
      <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
    </TableRow>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow>
        <TableHead>Participant Name/Alias</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Last Interaction</TableHead>
        <TableHead>Manage</TableHead>
      </TableRow>
    </TableHeader>
  )

  const ConnectionSlice = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{connection.participant.codename}</TableCell>
      <TableCell>connection.status</TableCell>
      <TableCell>{formatDate(connection.updated_at)}</TableCell>
      <TableCell>Manage button</TableCell>
    </TableRow>
  )

  return (
    <Table>
      {connections.length > 0 && <TableHeaderRow />}
      <TableBody>
        {connections.length == 0 ? (
          <EmptyRow />
        ) : (
          connections.map(connection => (
            <ConnectionSlice connection={connection} key={connection.id} />
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default ConnectionsTable
