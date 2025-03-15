import { useState } from 'react'

import ConnectionsTable from '@/components/Researcher/ConnectionsTable'
import DeclinedConnectionsTable from '@/components/Researcher/DeclinedConnectionsTable'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DECLINED_STATUSES } from '@/lib/connections'
import {
  ageRange,
  displayLocation,
  displayRemuneration,
  timeline,
} from '@/lib/study'

const StudyShow = ({ study, connections }) => {
  const [activePin, setActivePin] = useState('')

  const declinedConnections = []
  const activeConnections = []

  connections.map(c => {
    if (DECLINED_STATUSES.includes(c.status)) {
      declinedConnections.push(c)
    } else {
      activeConnections.push(c)
    }
  })
  const filteredConnections = activeConnections.filter(c =>
    c.pin.includes(activePin)
  )

  const StudyDetails = ({ study }) => (
    <>
      <h3>{study.title}</h3>
      <p key="short_desc">Short description: {study.short_desc}</p>
      <p key="long_desc">Long description: {study.long_desc}</p>
      <p key="study_type">Study type: {study.study_type}</p>
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
    />
  )

  return (
    <>
      <StudyDetails study={study} />

      <Label>Search by PIN</Label>
      <PinFinder />

      <h3>Active Connections</h3>
      <ConnectionsTable
        connections={filteredConnections}
        nullStatement="No connections for this study yet."
      />

      <h3>Declined Connections</h3>
      <DeclinedConnectionsTable
        connections={declinedConnections}
        nullStatement="No declined connections for this study."
      />
    </>
  )
}

export default StudyShow
