import { useState } from 'react'

import ConnectionsTable from '@/components/Researcher/ConnectionsTable'
import InvitationsTable from '@/components/Researcher/InvitationsTable'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ageRange,
  displayLocation,
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
      <p key="short_desc">Short description: {study.short_desc}</p>
      <p key="long_desc">Long description: {study.long_desc}</p>
      <p key="methodologies">Methodologies: {displayMethodologies(study)}</p>
      <p key="location">Location: {displayLocation(study)}</p>
      <p key="timeline">Timeline: {timeline(study)}</p>
      <p key="ageRange">Age range: {ageRange(study)}</p>
      <p key="remuneration">Est. remuneration: {displayRemuneration(study)}</p>
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">{study.title}</h2>
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
          connections={active_connections}
          nullStatement="No connections for this study yet."
        />
      </section>

      {!study.digital_only && (
        <section>
          <h3 className="text-lg font-bold">Invitations</h3>
          <InvitationsTable
            connections={invitations}
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
          {declined_count > 0 ? declined_count : 'No'} participants within range
          have declined this study.
        </p>
      </section>
    </div>
  )
}

export default StudyShow
