import { toast } from 'sonner'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { putRequest } from '@/lib/api'
import { MANAGE_STATUSES } from '@/lib/connections'

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
        <TableHead>Name/Alias</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>First Interaction</TableHead>
        <TableHead>Last Interaction</TableHead>
        <TableHead>PIN</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
  )

  const updateStatus = async (connection, status) =>
    await putRequest(`/p/connections/${connection.id}`, { status }).then(
      res => {
        const msg =
          res.status == '200'
            ? 'Changes saved!'
            : 'Uh oh, there was an error! Please refresh the page and try again.'

        toast(msg)
      }
    )

  const StatusDropdown = ({ connection }) => (
    <Select onValueChange={newStatus => updateStatus(connection, newStatus)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={capitalize(connection.status)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {MANAGE_STATUSES.map(status => (
            <SelectItem key={status} value={status}>
              {capitalize(status)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  const ConnectionSlice = ({ connection }) => (
    <TableRow className="even:bg-muted">
      <TableCell>{connection.name}</TableCell>
      <TableCell>{connection.email}</TableCell>
      <TableCell>{formatDate(connection.created_at).substr(3)}</TableCell>
      <TableCell>{formatDate(connection.updated_at).substr(3)}</TableCell>
      <TableCell style={{ fontFamily: 'monospace' }}>
        {connection.pin}
      </TableCell>
      <TableCell>
        <StatusDropdown connection={connection} />
      </TableCell>
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
