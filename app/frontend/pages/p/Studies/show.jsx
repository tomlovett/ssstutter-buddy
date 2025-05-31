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
import { postRequest, putRequest } from '@/lib/api'
import {
  displayLocationShort,
  displayMethodologies,
  displayRemuneration,
  timeline,
} from '@/lib/study'

const StudyShow = ({ study, researcher, connection }) => {
  const publishedDate = new Date(study.published_at).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  const upsertConnection = (status = 'interested') => {
    const body = { study_id: study.id, status }

    const request = connection?.id
      ? putRequest(`/p/connections/${connection.id}`, body)
      : postRequest('/p/connections', body)

    request.then(res => {
      if (res.status === '200' || res.status === '201') {
        toast('Success! Check your email', { duration: 7000 })
      } else {
        toast(
          'Uh oh! There was an error. Refresh the page, or email SSStutterBuddy if the problem persists',
          { duration: 10000 }
        )
      }
    })
  }

  const ExpressInterest = () => (
    <AlertDialog key="express-interest">
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
          <AlertDialogAction onClick={upsertConnection}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const NotInterested = () => (
    <AlertDialog key="not-interested">
      <AlertDialogTrigger asChild>
        <Button variant="outline">Not Interested</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Not interested?</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Is this study not a good fit for you?
            {/* Add input to leave explanation */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => upsertConnection('not_interested')}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
        <div className="mb-6 text-right">
          Led by{' '}
          <Link
            href={`/p/researchers/${researcher.id}`}
            className="text-primary hover:underline font-medium"
          >
            {researcher.professional_name}
          </Link>
          <p>{researcher.institution}</p>
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-right">Published {publishedDate}</p>
          <p>Location: {displayLocationShort(study)}</p>
          <p>Methodologies: {displayMethodologies(study)}</p>
          <p>Timeline: {timeline(study)}</p>
          <p>
            <span className="font-medium">Estimated remuneration:</span>{' '}
            <span>{displayRemuneration(study)}</span>
          </p>
        </div>

        <div className="prose max-w-none mb-8">
          <p>{study.long_desc}</p>
        </div>

        <div className="flex justify-center">
          {connection?.id &&
            (connection.status == 'not_interested' ? (
              <p>
                You declined interest in this study. Change your mind?{' '}
                <ExpressInterest />
              </p>
            ) : (
              <Button disabled>Connected</Button>
            ))}
          {!connection?.id && (
            <div className="flex gap-8 justify-between">
              <NotInterested />
              <ExpressInterest />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StudyShow
