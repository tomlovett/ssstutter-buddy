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
import { CONNECTION_STATUSES } from '@/lib/connections'

import { capitalize, formatDate } from '@/lib/utils'

const ConnectionsTable = ({ connections, nullStatement }) => {
  const EmptyTable = () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">
            {nullStatement}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
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

  const updateStudyStatus = async (connection, status) =>
    await putRequest(`/r/connections/${connection.id}`, { status }).then(
      res => {
        const msg =
          res.status == '200'
            ? 'Changes saved!'
            : 'Uh oh, there was an error! Please refresh the page and try again.'

        toast(msg)
      }
    )

  const ConnectionStatusDropdown = ({ connection }) => (
    <Select
      onValueChange={newStatus => updateStudyStatus(connection, newStatus)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={capitalize(connection.status)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {CONNECTION_STATUSES.map(status => (
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
        <ConnectionStatusDropdown connection={connection} />
      </TableCell>
    </TableRow>
  )

  return connections.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table className="rounded-md">
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
