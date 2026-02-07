import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, MapPin, Clock, Banknote, FileCheck, Building2, Loader2 } from 'lucide-react'

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Form, FormMessage } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import FormCheckbox from '@/components/ui/custom/formCheckbox'
import AnonymousInvitationSchema from '@/schemas/AnonymousInvitation'
import InvitationSchema from '@/schemas/Invitation'
import { postRequest } from '@/lib/api'
import { displayLocationShort, displayRemuneration, timeline, status, LOCATION_TYPES } from '@/lib/study'
import { hasMadeDecision, ACCEPTED, INTERESTED, NOT_INTERESTED } from '@/lib/invitations'
import { parseMarkdown } from '@/lib/utils'

const StudyShow = ({ user, study, researcher, invitation }) => {
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false)

  const formSchema = user ? InvitationSchema : AnonymousInvitationSchema

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      study_id: study.id,
      participant_id: user?.participant?.id,
      status: INTERESTED,
      status_explanation: '',
      anonymous: !user,
      first_name: '',
      last_name: '',
      email: '',
      send_new_studies_emails: true,
    },
  })

  const onSubmit = data => {
    postRequest('/p/invitations', data).then(res => {
      if (res.status === 401) {
        setIsLoginRequiredModalOpen(true)
      } else if (res.ok) {
        form.reset()
      }
    })
  }

  const LoginSuggestion = () => (
    <>
      <br />
      <br />
      Already have an account?{' '}
      <Link href={`/login?return_to=${encodeURIComponent(window.location.pathname)}`}>Login</Link>
    </>
  )

  const ExpressInterestModal = () => (
    <AlertDialog key="express-interest">
      <AlertDialogTrigger asChild>
        <Button className="w-full">Express Interest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm your interest</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription>
            By confirming interest, an email will be sent to you and the researcher so that you can connect
            off the platform.
            {!user && <LoginSuggestion />}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!user ? ( // unAuth form
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput form={form} name="first_name" placeholder="First Name" required />
              <FormInput form={form} name="last_name" placeholder="Last Name" required />
              <FormInput form={form} name="email" placeholder="Email" required />
              <FormCheckbox
                form={form}
                name="send_new_studies_emails"
                subtitle="Send me an email when new studies are posted"
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => form.reset()}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.setValue('status', INTERESTED)
                    form.handleSubmit(onSubmit)()
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => form.reset()}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.setValue('status', INTERESTED)
                form.handleSubmit(onSubmit)()
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )

  const NotInterestedModal = () => (
    <AlertDialog key="not-interested">
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Not Interested
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Is this study not a good fit for you?</AlertDialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Would you like to share why with the researcher?
                <br />
                <br />
                (This may be read by a human being, so please be respectful.)
              </p>
              <FormTextarea
                form={form}
                name="status_explanation"
                placeholder="Optional explanation..."
                className="min-h-[100px] resize-none"
              />
              <FormMessage />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => form.reset()}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                onClick={() => {
                  form.setValue('status', NOT_INTERESTED)
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )

  const LoginRequiredModal = () => (
    <AlertDialog open={isLoginRequiredModalOpen} onOpenChange={setIsLoginRequiredModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login Required</AlertDialogTitle>
          <AlertDialogDescription>
            It looks like you have an account. This link will take you to login and then return you to this
            study.
            <div className="text-center mt-4">
              <Link
                href={`/login?return_to=${encodeURIComponent(window.location.pathname)}`}
                className="text-primary hover:underline font-medium"
              >
                Go to Login
              </Link>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsLoginRequiredModalOpen(false)}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const ConnectionManagementButtons = () => {
    // Participant has not been invited or has not made a decision, display both options
    if (!invitation || !hasMadeDecision(invitation)) {
      return (
        <div className="flex flex-col gap-3">
          <ExpressInterestModal />
          {user && <NotInterestedModal />}
        </div>
      )
    }

    if ([ACCEPTED, INTERESTED].includes(invitation.status)) {
      // Participant has already accepted
      return (
        <Button disabled className="w-full">
          Connected
        </Button>
      )
    } else {
      // Participant has declined interest
      return (
        <div className="text-center">
          <p className="mb-4">You declined interest in this study. Change your mind?</p>
          <ExpressInterestModal />
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
        <h3 className="text-2xl font-bold mb-4 text-center">Study not accepting participants</h3>
        <p className="text-center mb-12">
          This study is not currently accepting participants. Check back later. Studies are very important to
          advancing the field of stuttering research. Your commitment to participate is greatly appreciated.
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

  const locationBadgeText =
    study.location_type === LOCATION_TYPES.DIGITAL
      ? 'Online'
      : study.location_type === LOCATION_TYPES.HYBRID
        ? 'Hybrid'
        : 'In-Person'

  const researcherInitials =
    [researcher.first_name?.[0], researcher.last_name?.[0]].filter(Boolean).join('').toUpperCase() ||
    researcher.professional_name?.slice(0, 2)?.toUpperCase() ||
    '?'

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link
          href="/p"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Studies
        </Link>
      </Button>

      <h1 className="mb-4 text-3xl font-bold tracking-tight">{study.title}</h1>
      <div className="mb-8 flex flex-wrap gap-2">
        {study.survey_only && <Badge variant="secondary">Survey Only</Badge>}
        <Badge variant="secondary">{locationBadgeText}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-2 space-y-8 lg:order-1 lg:col-span-2">
          <Card className="border bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Led By</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                {researcher.headshot_url ? (
                  <AvatarImage src={researcher.headshot_url} alt={researcher.professional_name} />
                ) : null}
                <AvatarFallback>{researcherInitials}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/p/researchers/${researcher.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {researcher.professional_name}
                </Link>
                {researcher.institution && (
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    {researcher.institution}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="mb-4 text-xl font-semibold">About the Study</h2>
            <div
              className="prose prose-slate prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(study.long_desc) }}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-1">
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">Study Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{displayRemuneration(study)}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{timeline(study)}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{displayLocationShort(study)}</span>
              </div>
              {study.irb_number && (
                <div className="flex items-start gap-3">
                  <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{study.irb_number}</span>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <ConnectionManagementButtons />
                {(!invitation || !hasMadeDecision(invitation)) && (
                  <p className="text-xs text-muted-foreground">
                    Your contact info is hidden until you confirm interest.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LoginRequiredModal />
    </div>
  )
}

export default StudyShow
