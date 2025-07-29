import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { INVITED } from '@/lib/invitations'

const InvitationsTable = ({ invitations }) => {
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

  const InvitationRow = ({ invitation }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{invitation.name}</TableCell>
      <TableCell>{formatDate(invitation.updated_at).substr(3)}</TableCell>
      <TableCell>{INVITED}</TableCell>
    </TableRow>
  )

  return invitations.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table className="rounded-md">
      <TableHeaderRow />
      <TableBody>
        {invitations.map(invitation => (
          <InvitationRow invitation={invitation} key={invitation.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export default InvitationsTable
