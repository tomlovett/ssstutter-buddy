import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table'

import { capitalize, formatDate } from '@/lib/utils'

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
        <TableHead>PIN</TableHead>
        <TableHead>Manage</TableHead>
      </TableRow>
    </TableHeader>
  )

  const ConnectionSlice = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{connection.participant.codename}</TableCell>
      <TableCell>{capitalize(connection.status)}</TableCell>
      <TableCell>{formatDate(connection.updated_at)}</TableCell>
      <TableCell style={{ fontFamily: 'monospace' }}>
        {connection.pin}
      </TableCell>
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
