import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckSquare } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { ageRangeShort, displayHours } from '@/lib/study'
import { formatDate } from '@/lib/utils'

const infoBadgeClasses = 'py-2 bg-blue-500 text-white border-blue-700'

const StudyTable = ({ studies, nullStatement }) => {
  const EmptyState = () => <div className="text-muted-foreground text-center p-6">{nullStatement}</div>

  const StudyRow = ({ study }) => {
    const invitationStatus = study.invitation?.status
    const isAccepted = invitationStatus === 'accepted' || invitationStatus === 'interested'
    const isDeclined = invitationStatus === 'declined' || invitationStatus === 'not interested'

    const Infobadge = ({ text }) => (
      <Badge variant="outline" className={infoBadgeClasses}>
        {text}
      </Badge>
    )

    return (
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
        <div className="text-lg font-medium">{study.title}</div>
        <div className="flex items-center gap-2 flex-wrap">
          {isAccepted && (
            <Badge
              variant="outline"
              className="py-2 bg-green-700 text-white border-green-200 flex items-center justify-center"
            >
              <CheckSquare size={16} className="text-white" />
            </Badge>
          )}

          {isDeclined && (
            <Badge variant="outline" className="py-2 bg-orange-100 text-orange-700 border-orange-700">
              Pass
            </Badge>
          )}

          {(study.min_age || study.max_age) && <Infobadge text={ageRangeShort(study)} />}

          <Infobadge text={displayHours(study.total_hours)} />

          {study.survey_only && <Infobadge text="Survey" />}

          <Infobadge text={formatDate(study.created_at)} />

          <div className="ml-auto">
            <Button variant="outline" size="sm" asChild className={'border-blue-700'}>
              <Link href={`/p/studies/${study.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      {studies.length === 0 ? (
        <EmptyState />
      ) : (
        studies.map(study => <StudyRow study={study} key={study.id} />)
      )}
    </div>
  )
}

export default StudyTable
