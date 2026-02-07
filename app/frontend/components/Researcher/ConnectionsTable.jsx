import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { formatDate } from '@/lib/utils'

const formatLocation = p => {
  const loc = p?.location
  if (!loc) return '—'
  const parts = [loc.city, loc.state, loc.country].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

const ConnectionsTable = ({ connections, nullStatement, id }) => {
  const EmptyTable = () => (
    <Table id={id || null}>
      <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">{nullStatement}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow>
        <TableHead>Name/Alias</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Latest Interaction</TableHead>
      </TableRow>
    </TableHeader>
  )

  const ConnectionSlice = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell key="name">
        {connection.participant.first_name} {connection.participant.last_name}
      </TableCell>
      <TableCell key="email">{connection.participant?.email}</TableCell>
      <TableCell key="location">{formatLocation(connection.participant)}</TableCell>
      <TableCell key="updated_at">{formatDate(connection.updated_at)}</TableCell>
    </TableRow>
  )

  return connections.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table className="rounded-md" id={id}>
      {connections.length > 0 && <TableHeaderRow />}
      <TableBody>
        {connections.map(connection => (
          <ConnectionSlice connection={connection} key={connection.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export default ConnectionsTable
