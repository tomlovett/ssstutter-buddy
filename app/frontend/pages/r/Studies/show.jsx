import { useState } from 'react'
import { Link } from '@inertiajs/react'

import ConnectionsTable from '@/components/Researcher/ConnectionsTable'
import InvitationsTable from '@/components/Researcher/InvitationsTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ageRange,
  displayLocationShort,
  displayMethodologies,
  displayRemuneration,
  timeline,
} from '@/lib/study'

const StudyShow = ({
  study,
  active_connections,
  invitations,
  completed_connections,
  declined_count,
}) => {
  const [activePin, setActivePin] = useState('')

  const StudyDetails = ({ study }) => (
    <>
      <p key="short_desc" className="text-sm text-foreground mb-2">
        <span className="font-medium">Short description:</span>{' '}
        {study.short_desc}
      </p>
      <p key="long_desc" className="text-sm text-foreground mb-4">
        <span className="font-medium">Long description:</span> {study.long_desc}
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p key="methodologies" className="text-foreground">
          <span className="font-medium">Methodologies:</span>{' '}
          {displayMethodologies(study)}
        </p>
        <p key="location" className="text-foreground">
          <span className="font-medium">Location:</span>{' '}
          {displayLocationShort(study)}
        </p>
        <p key="timeline" className="text-foreground">
          <span className="font-medium">Timeline:</span> {timeline(study)}
        </p>
        <p key="ageRange" className="text-foreground">
          <span className="font-medium">Age range:</span> {ageRange(study)}
        </p>
        <p key="remuneration" className="text-foreground">
          <span className="font-medium">Est. remuneration:</span>{' '}
          {displayRemuneration(study)}
        </p>
      </div>
    </>
  )

  const updatePin = value => !isNaN(Number(value)) && setActivePin(value)

  const PinFinder = () => (
    <Input
      value={activePin}
      onChange={e => updatePin(e.target.value)}
      autoFocus
      maxLength={6}
      className="w-24"
    />
  )

  const filtered_connections = active_connections.filter(connection =>
    connection.pin?.toString().includes(activePin)
  )

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{study.title}</h2>
          <Button asChild>
            <Link href={`/r/studies/${study.id}/edit`}>Edit</Link>
          </Button>
        </div>
        <StudyDetails study={study} />
      </div>

      <section>
        <div className="flex items-center gap-2 justify-between mr-12">
          <h3 className="text-lg font-bold">Active Connections</h3>
          <div className="flex items-center gap-2">
            <Label>Search active connections by PIN</Label>
            <PinFinder />
          </div>
        </div>

        <ConnectionsTable
          connections={filtered_connections}
          nullStatement="No connections for this study yet."
        />
      </section>

      {!study.digital_only && (
        <section>
          <h3 className="text-lg font-bold">Invitations</h3>
          <InvitationsTable
            invitations={invitations}
            nullStatement="No participants currently in range for this study."
          />
        </section>
      )}

      <section>
        <h3 className="text-lg font-bold">Completed Connections</h3>
        <ConnectionsTable
          connections={completed_connections}
          nullStatement="No completed connections for this study yet."
        />
      </section>

      <section>
        <h3 className="text-lg font-bold">Declined Connections</h3>
        <p className="text-sm text-gray-500">
          {declined_count > 0 ? declined_count : 'No'} participants have
          declined this study.
        </p>
      </section>
    </div>
  )
}

export default StudyShow
