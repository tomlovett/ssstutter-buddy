import { Link } from '@inertiajs/react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { postRequest } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { displayLocation, displayRemuneration, timeline } from '@/lib/study'

const StudyShow = ({ study, researcher, connection }) => {
  const body = { study_id: study.id }
  const postCreateConnection = () => {
    postRequest('/p/connections', body).then(res => {
      if (res.status == '201') {
        toast('Success! Check your email', { duration: 5000 })
      } else {
        toast(
          'Uh oh! There was an error. Refresh the page, or email SSStutterBuddy if the problem persists',
          { duration: 10000 }
        )
      }
    })
  }

  const ExpressInterest = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Express Interest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm your interest</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription>
            By confirming interest, an email will be sent to you and the
            researcher so that you can connect off the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={postCreateConnection}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const StudyButton = () =>
    connection?.id ? (
      <p>You are connected to this study</p>
    ) : (
      <ExpressInterest />
    )

  return (
    <>
      <h3>{study.title}</h3>
      <p>
        <Link href={`/p/researchers/${researcher.id}`}>
          {researcher.professional_name}
        </Link>
      </p>
      <p>{researcher.institution}</p>
      <p>
        {formatDate(study.open_date) + ' - ' + formatDate(study.close_date)}
      </p>
      <p>{displayLocation(study)}</p>
      <p>{study.study_type}</p>
      <p>{timeline(study)}</p>
      <p>Remuneration: {displayRemuneration(study)}</p>
      <p>{study.long_desc}</p>
      <StudyButton />
    </>
  )
}

export default StudyShow
