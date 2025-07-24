import { Link, router } from '@inertiajs/react'
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
import { status } from '@/lib/study'
import { hasMadeDecision } from '@/lib/connections'
import { Loader2 } from 'lucide-react'

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
    const body = { study_id: study.id, invitation_status: status }

    const request = connection?.id
      ? putRequest(`/p/connections/${connection.id}`, body)
      : postRequest('/p/connections', body)

    request.then(res => {
      if (res.status === '200' || res.status === '201') {
        toast('Success!', { duration: 7000 })
      } else {
        toast(
          'Uh oh! There was an error. Try refreshing the page, or email SSStutterBuddy if the problem persists',
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
          <AlertDialogAction onClick={() => upsertConnection('not interested')}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const ConnectionManagementButtons = () => {
    // Participant has not been invited or has not made a decision, display both options
    if (!connection || !hasMadeDecision(connection)) {
      return (
        <div className="flex gap-4">
          <NotInterested />
          <ExpressInterest />
        </div>
      )
    }

    if (['accepted', 'interested'].includes(connection.invitation_status)) {
      // Participant has already accepted
      return <Button disabled>Connected</Button>
    } else {
      // Participant has declined interest
      return (
        <div className="text-center">
          <p className="mb-4">
            You declined interest in this study. Change your mind?
          </p>
          <ExpressInterest />
        </div>
      )
    }
  }

  if (status(study) === 'paused' || status(study) === 'draft') {
    setTimeout(() => {
      router.visit('/p')
    }, 7500)

    return (
      <div className="container mx-auto w-1/2 px-4 py-16 shadow-md border rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Study not accepting participants
        </h3>
        <p className="text-center mb-12">
          This study is not currently accepting participants. Check back later.
          Studies are very important to advancing the field of stuttering
          research. Your commitment to participate is greatly appreciated.
          <br />
          <br />
          You will now be redirected.
        </p>
        <div className="flex justify-center mb-12">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
        <div className="flex justify-center mb-12">
          <Button onClick={() => router.visit('/p')}>Okay</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-4">{study.title}</h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="mb-4 ml-2">
            <p className="text-lg mb-2">
              Led by{' '}
              <Link
                href={`/p/researchers/${researcher.id}`}
                className="text-primary hover:underline font-medium"
              >
                {researcher.professional_name}
              </Link>{' '}
              of {researcher.institution}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-gray-600">Published {publishedDate}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg mb-2">Study Details</h3>
                <ul className="space-y-2 ml-2">
                  <li>
                    <span className="font-medium">Location:</span>{' '}
                    {displayLocationShort(study)}
                  </li>
                  <li>
                    <span className="font-medium">Methodologies:</span>{' '}
                    {displayMethodologies(study)}
                  </li>
                  <li>
                    <span className="font-medium">Timeline:</span>{' '}
                    {timeline(study)}
                  </li>
                  <li>
                    <span className="font-medium">Estimated remuneration:</span>{' '}
                    {displayRemuneration(study)}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h3 className="text-lg mb-2">Study Description</h3>
            <p className="ml-2">{study.long_desc}</p>
          </div>

          <div className="flex justify-center gap-4">
            <ConnectionManagementButtons />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyShow
