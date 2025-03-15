import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
        <TableHead>Alias</TableHead>
        <TableHead>First Interaction</TableHead>
        <TableHead>Last Interaction</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
  )

  const ConnectionSlice = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{connection.name}</TableCell>
      <TableCell>{formatDate(connection.created_at).substr(3)}</TableCell>
      <TableCell>{formatDate(connection.updated_at).substr(3)}</TableCell>
      <TableCell>{capitalize(connection.status)}</TableCell>
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
