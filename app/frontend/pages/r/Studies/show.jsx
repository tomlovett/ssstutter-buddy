import { useState, useMemo } from 'react'
import { Link } from '@inertiajs/react'
import { Pencil, ChevronDown, MapPin, Clock, Banknote, FileText, ClipboardCheck, Search } from 'lucide-react'

import ConnectionsTable from '@/components/Researcher/ConnectionsTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { status, displayLocationShort, displayRemuneration, timeline } from '@/lib/study'
import { parseMarkdown } from '@/lib/utils'

const StudyShow = ({ study, connections }) => {
  const [configOpen, setConfigOpen] = useState(true)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filterBySearch = (connections, term) => {
    if (!term.trim()) return connections
    const t = term.toLowerCase().trim()
    return connections.filter(connection => {
      const p = connection.participant
      const name = `${p?.first_name || ''} ${p?.last_name || ''}`.toLowerCase()
      const email = (p?.email || '').toLowerCase()
      const locationStr = p?.location
        ? [p.location.city, p.location.state, p.location.country].filter(Boolean).join(', ').toLowerCase()
        : ''
      return name.includes(t) || email.includes(t) || locationStr.includes(t)
    })
  }

  const filteredConnections = useMemo(
    () => filterBySearch(connections || [], searchTerm),
    [connections, searchTerm]
  )

  const studyStatus = status(study)
  const statusLabel = studyStatus.charAt(0).toUpperCase() + studyStatus.slice(1)

  const hasAutosend =
    study.autosend_url || study.autosend_message || study.autosend_verified_only !== undefined

  const descriptionPreview = study.long_desc
    ? study.long_desc.length > 200
      ? study.long_desc.slice(0, 200) + '...'
      : study.long_desc
    : ''
  const showViewDescription = study.long_desc && study.long_desc.length > 200

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{study.title}</h1>
          <Badge variant="secondary">{statusLabel}</Badge>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/r/studies/${study.id}/edit`} className="inline-flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Study
          </Link>
        </Button>
      </div>

      <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer select-none">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Study Configuration</CardTitle>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${configOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {study.irb_number && (
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{study.irb_number}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{displayLocationShort(study)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{timeline(study)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{displayRemuneration(study)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>Survey only: {study.survey_only ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    {descriptionExpanded ? (
                      <div
                        className="prose prose-sm mt-1 max-w-none"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(study.long_desc || '') }}
                      />
                    ) : (
                      <p className="mt-1 text-sm">{descriptionPreview}</p>
                    )}
                    {showViewDescription && (
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm"
                        onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                      >
                        {descriptionExpanded ? 'Show less' : 'View full description'}
                      </Button>
                    )}
                  </div>

                  {hasAutosend && (
                    <div className="rounded-md border p-3">
                      <p className="mb-2 text-sm font-medium">Autosend Settings</p>
                      {study.autosend_url && (
                        <p className="text-sm">
                          <span className="text-muted-foreground">URL:</span> {study.autosend_url}
                        </p>
                      )}
                      {study.autosend_message && (
                        <p className="mt-1 text-sm">
                          <span className="text-muted-foreground">Message:</span>{' '}
                          {study.autosend_message.slice(0, 100)}
                          {study.autosend_message.length > 100 ? '...' : ''}
                        </p>
                      )}
                      {study.autosend_verified_only !== undefined && (
                        <p className="mt-1 text-sm">
                          <span className="text-muted-foreground">Verified only:</span>{' '}
                          {study.autosend_verified_only ? 'Yes' : 'No'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Connections</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ConnectionsTable
            id="connections-table"
            connections={filteredConnections}
            nullStatement="No connections for this study yet."
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default StudyShow
