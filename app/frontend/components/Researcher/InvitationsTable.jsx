import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'

const InvitationsTable = ({ connections }) => {
  const EmptyTable = () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">
            No participants found within range
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )

  const TableHeaderRow = () => (
    <TableHeader>
      <TableRow>
        <TableHead>Name/Alias</TableHead>
        <TableHead>Date Invited</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
  )

  const InvitationRow = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{connection.name}</TableCell>
      <TableCell>{formatDate(connection.updated_at).substr(3)}</TableCell>
      <TableCell>Invited</TableCell>
    </TableRow>
  )

  return connections.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table>
      <TableHeaderRow />
      <TableBody>
        {connections.map(connection => (
          <InvitationRow connection={connection} key={connection.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export default InvitationsTable
