import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, MapPin, Users, Mail, ChevronDown } from 'lucide-react'

import LocationTool from '@/components/lib/LocationTool'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormMessage } from '@/components/ui/form'
import FormCheckbox from '@/components/ui/custom/formCheckbox'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import FormRadioGroup from '@/components/ui/custom/formRadioGroup'
import FormMarkdownEditor from '@/components/ui/custom/formMarkdownEditor'
import { postRequest, putRequest } from '@/lib/api'
import { ageRange, validateStudy, status } from '@/lib/study'
import StudyInProgressSchema from '@/schemas/StudyInProgress'

const LOCATION_TYPES = [
  { value: 'digital', label: 'Online Only' },
  { value: 'in_person', label: 'In-Person Only' },
  { value: 'hybrid', label: 'Hybrid' },
]

const StudyEdit = ({ user, study }) => {
  const [errors, setErrors] = useState([])
  const form = useForm({
    resolver: zodResolver(StudyInProgressSchema),
    defaultValues: {
      title: study.title || '',
      short_desc: study.short_desc || '',
      long_desc: study.long_desc || '',
      irb_number: study.irb_number || '',
      survey_only: study.survey_only ?? false,
      location_type: study.location_type || '',
      location: {
        country: study.location?.country || '',
        state: study.location?.state || '',
        city: study.location?.city || '',
      },
      min_age: study.min_age || 18,
      max_age: study.max_age || '',
      total_hours: study.total_hours || '',
      total_sessions: study.total_sessions || '',
      duration: study.duration || '',
      remuneration: study.remuneration || '',
      open_date: study.open_date || '',
      autosend_url: study.autosend_url || '',
      autosend_message: study.autosend_message || '',
      autosend_verified_only: study.autosend_verified_only ?? true,
    },
  })

  const watchedStudy = form.watch()

  const saveStudy = async studyValues => {
    try {
      await putRequest(`/r/studies/${study.id}`, studyValues)
      toast.success('Changes saved!', 6000)
    } catch (_error) {
      console.log(_error)
      toast.error('Failed to update study', 6000)
    }
  }

  const publishStudy = async statusChange => {
    const studyValues = { ...watchedStudy, ...statusChange }
    const { isValid, errors } = validateStudy(studyValues)
    setErrors(errors)

    if (!isValid) {
      toast.error('Please fill out all required fields', 10000)
      return
    }

    await postRequest(`/r/studies/${study.id}/publish`, studyValues)
  }

  const formatLocationAttributes = refinedValues => {
    // Transform location data to match the expected API format
    if (refinedValues.location_type === 'digital' && !study.location) {
      return null
    }
    let location_attributes = {
      id: study.location?.id,
      ...refinedValues.location,
    }

    if (refinedValues.location_type === 'digital') {
      location_attributes._destroy = true
    }
    return location_attributes
  }

  const saveFormChanges = formValues => {
    const refinedValues = Object.assign({}, formValues)

    refinedValues.location_attributes = formatLocationAttributes(refinedValues)
    delete refinedValues.location

    saveStudy(refinedValues)
  }

  const studyStatus = status(study)
  const statusLabel = studyStatus.charAt(0).toUpperCase() + studyStatus.slice(1)

  const StatusDropdown = () => {
    let displayList = {}
    switch (studyStatus) {
      case 'draft':
        displayList = { publish: true }
        break
      case 'active':
        displayList = { pause: true, close: true }
        break
      case 'closed':
        displayList = { reopen: true }
        break
      case 'paused':
        displayList = { resume: true, close: true }
        break
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Manage Status
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {displayList.publish && (
            <DropdownMenuItem onClick={() => publishStudy({ published_at: new Date() })}>
              Publish
            </DropdownMenuItem>
          )}
          {displayList.pause && (
            <DropdownMenuItem onClick={() => saveStudy({ paused_at: new Date() })}>Pause</DropdownMenuItem>
          )}
          {displayList.resume && (
            <DropdownMenuItem onClick={() => publishStudy({ paused_at: null })}>Resume</DropdownMenuItem>
          )}
          {displayList.reopen && (
            <DropdownMenuItem onClick={() => publishStudy({ closed_at: null, paused_at: null })}>
              Reopen
            </DropdownMenuItem>
          )}
          {displayList.close && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => saveStudy({ closed_at: new Date() })}
                className="text-destructive focus:text-destructive"
              >
                Close Study
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const ErrorMessages = () =>
    errors.length > 0 && (
      <div className="border border-orange-500 rounded-md p-4 m-4">
        <p>More information is required to publish this study. Please fill out the following fields:</p>
        <ul className="list-disc list-inside">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold truncate max-w-[200px] md:max-w-[400px]">
            Editing: {study.title || 'Untitled Study'}
          </h3>
          <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
            <Badge variant="secondary">{statusLabel}</Badge>
            <StatusDropdown />
            <Button variant="ghost" asChild>
              <Link href={`/r/studies/${study.id}`}>Back</Link>
            </Button>
            <Button type="submit" form="study-edit-form">
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <ErrorMessages />

      <Form {...form}>
        <form id="study-edit-form" onSubmit={form.handleSubmit(saveFormChanges)} className="w-2/3 space-y-6">
          <Accordion type="multiple" defaultValue={['details', 'logistics']} className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0" />
                  General Information
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                <FormInput form={form} name="title" placeholder="Title" label="Title" />
                <FormInput form={form} name="irb_number" placeholder="IRB number" label="IRB number" />
                <FormInput
                  form={form}
                  name="short_desc"
                  placeholder="Short Description"
                  label="Short Description"
                  desc="A sentence or two describing the study"
                />
                <FormMarkdownEditor
                  form={form}
                  name="long_desc"
                  label="Long Description"
                  placeholder="Long Description"
                  desc="Describe the study in as much detail as you like, letting the participant know what to expect, and what will be required of them"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="logistics">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Logistics & Location
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                <FormRadioGroup
                  form={form}
                  name="location_type"
                  title="Location Type"
                  items={LOCATION_TYPES}
                />

                {watchedStudy.location_type !== 'digital' && (
                  <LocationTool
                    location={watchedStudy.location || { country: '', state: '', city: '' }}
                    onSave={locationValues => {
                      form.setValue('location', {
                        country: locationValues.country || '',
                        state: locationValues.state || '',
                        city: locationValues.city || '',
                      })
                    }}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    form={form}
                    name="total_hours"
                    placeholder="Total number of hours required to complete study"
                    label="Total Hours"
                    desc='Use fractions to denote minutes. i.e. ".75" for 45 minutes'
                  />
                  <FormInput
                    form={form}
                    name="total_sessions"
                    placeholder="Number of expected sessions required to complete study"
                    label="Total Sessions"
                    desc="The different number of times a participant has to come in"
                  />
                </div>

                <FormInput
                  form={form}
                  name="duration"
                  placeholder="Leave blank if only one session is required"
                  label="Study Duration"
                  desc='Overall timeline for study completion. i.e. "1 week," " 2 days," or "3 months"'
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    form={form}
                    name="remuneration"
                    placeholder="Gratis"
                    label="Estimated Remuneration"
                    desc="The estimated compensation in $USD (can be zero)"
                  />
                  <FormCheckbox
                    form={form}
                    name="survey_only"
                    title="Survey-only?"
                    subtitle="The only required task for the participant is to complete a survey form"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="criteria">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  Participant Criteria
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                <p className="text-sm text-foreground pl-4">
                  Current age range: &quot;{ageRange(watchedStudy)}&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    form={form}
                    name="min_age"
                    placeholder="Minimum allowable age of participants"
                    label="Minimum Age"
                    desc="Leave blank if there is no minimum age constraint"
                  />
                  <FormInput
                    form={form}
                    name="max_age"
                    placeholder="Maximum allowable age of participants"
                    label="Maximum Age"
                    desc="Leave blank if there is no maximum age constraint"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="automation">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  Automation Settings
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                <p className="text-sm text-foreground pl-4">
                  Include a survey link and/or personal message in the email participants receive when they
                  connect to your study
                </p>

                <FormTextarea
                  form={form}
                  name="autosend_message"
                  label="Autosend Message"
                  placeholder="i.e. Thank you for your interest in our study! Please fill out the survey linked below and we will follow-up with you shortly."
                  desc="If left blank, the participant connection email will include this:"
                />
                <p className="text-sm text-foreground pl-4">
                  <i>
                    {user.first_name} -- cc'd on this email -- will contact you soon to arrange completion of
                    the study.
                  </i>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    form={form}
                    name="autosend_url"
                    placeholder="i.e. https://surveyforms.com/rwe1720"
                    label="Autosend URL"
                  />
                  <FormCheckbox
                    form={form}
                    name="autosend_verified_only"
                    title="Autosend to verified participants only (more secure)"
                    subtitle="If enabled, the autosend URL will only be sent to users who have created an account and are verified"
                    disabled={!watchedStudy.autosend_url}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormMessage />
        </form>
      </Form>
    </>
  )
}

export default StudyEdit
