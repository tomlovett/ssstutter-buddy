import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import LocationTool from '@/components/lib/LocationTool'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import FormCheckboxes from '@/components/ui/custom/formCheckboxes'
import FormCheckbox from '@/components/ui/custom/formCheckbox'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import FormRadioGroup from '@/components/ui/custom/formRadioGroup'
import FormMarkdownEditor from '@/components/ui/custom/formMarkdownEditor'
import { postRequest, putRequest } from '@/lib/api'
import {
  ageRange,
  displayLocationShort,
  displayRemuneration,
  validateStudy,
  timeline,
  status,
  statusText,
} from '@/lib/study'
import StudyInProgressSchema from '@/schemas/StudyInProgress'

const topFormFields = [
  { name: 'title', placeholder: 'Title', label: 'Title' },
  {
    name: 'short_desc',
    placeholder: 'Short Description',
    label: 'Short Description',
    desc: 'A sentence or two describing the study',
  },
  {
    name: 'long_desc',
    placeholder: 'Long Description',
    label: 'Long Description',
    desc: 'Describe the study in as much detail as you like, letting the participant know what to expect, and what will be required of them',
  },
  {
    name: 'irb_number',
    placeholder: 'IRB number',
    label: 'IRB number',
  },
]

const ageFields = [
  {
    name: 'min_age',
    placeholder: 'Minimum allowable age of participants',
    label: 'Minimum Age',
    desc: 'Leave blank if there is no minimum age constraint',
  },
  {
    name: 'max_age',
    placeholder: 'Maximum allowable age of participants',
    label: 'Maximum Age',
    desc: 'Leave blank if there is no maximum age constraint',
  },
]

const timelineFields = [
  {
    name: 'total_hours',
    placeholder: 'Total number of hours required to complete study',
    label: 'Total Hours',
    desc: 'Use fractions to denote minutes. i.e. .75 hours for 45 minutes',
  },
  {
    name: 'total_sessions',
    placeholder: 'Number of expected sessions required to complete study',
    label: 'Total Sessions',
  },
  {
    name: 'duration',
    placeholder: 'Overall timeline for study completion',
    label: 'Duration',
    desc: 'i.e. "1 week," " 2 days," or "3 months"',
  },
]

const METHODOLOGIES = [
  { id: 'Survey', label: 'Survey' },
  { id: 'Interview', label: 'Interview' },
  { id: 'Task performance', label: 'Task Performance' },
  { id: 'Brain imaging', label: 'Brain Imaging' },
  { id: 'Speech intervention', label: 'Speech Intervention' },
  { id: 'Behavioral intervention', label: 'Behavioral Intervention' },
  { id: 'Genetic sample collection', label: 'Genetic Sample Collection' },
  { id: 'Pharmaceutical trial', label: 'Pharmaceutical' },
  { id: 'Speaker panel', label: 'Speaker Panel' },
]

const LOCATION_TYPES = [
  { value: 'digital', label: 'Digital Only' },
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
      methodologies: study.methodologies?.split(',') || [],
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
    refinedValues.methodologies = formValues.methodologies.join(',')

    refinedValues.location_attributes = formatLocationAttributes(refinedValues)
    delete refinedValues.location

    saveStudy(refinedValues)
  }

  const StatusButtons = () => {
    let displayList = {}

    switch (status(study)) {
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
      <>
        {displayList.publish && (
          <Button onClick={() => publishStudy({ published_at: new Date() })}>Publish</Button>
        )}
        {displayList.pause && <Button onClick={() => saveStudy({ paused_at: new Date() })}>Pause</Button>}
        {displayList.resume && <Button onClick={() => publishStudy({ paused_at: null })}>Resume</Button>}
        {displayList.close && <Button onClick={() => saveStudy({ closed_at: new Date() })}>Close</Button>}
        {displayList.reopen && (
          <Button onClick={() => publishStudy({ closed_at: null, paused_at: null })}>Reopen</Button>
        )}
      </>
    )
  }

  const StatusRow = () => (
    <div className="flex items-center gap-4 border border-gray-200 justify-end p-4 rounded-md">
      <span className="text-sm text-foreground">{statusText(study)}</span>
      <StatusButtons />
    </div>
  )

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
      <StatusRow />
      <ErrorMessages />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveFormChanges)} className="w-2/3 space-y-6">
          <h3 className="text-lg font-semibold">Study Details</h3>
          {topFormFields.map(({ name, label, placeholder, desc }) =>
            name == 'long_desc' ? (
              <FormMarkdownEditor
                key={name}
                form={form}
                name={name}
                label={label}
                placeholder={placeholder}
                desc={desc}
              />
            ) : (
              <FormInput
                key={name}
                form={form}
                name={name}
                placeholder={placeholder}
                label={label}
                desc={desc}
              />
            )
          )}

          <FormCheckboxes
            form={form}
            title="Methodologies"
            subtitle="Select all that apply"
            name="methodologies"
            items={METHODOLOGIES}
          />

          {/* <p>Location: {displayLocationShort(watchedStudy)}</p> */}
          <h3 className="text-lg font-semibold">Study Logistics</h3>
          <FormRadioGroup form={form} name="location_type" title="Location Type" items={LOCATION_TYPES} />

          {watchedStudy.location_type !== 'digital' && (
            <LocationTool
              location={watchedStudy.location}
              onSave={locationValues => {
                form.setValue('location', {
                  country: locationValues.country || '',
                  state: locationValues.state || '',
                  city: locationValues.city || '',
                })
              }}
            />
          )}

          <h3 className="text-lg font-semibold">Age Restrictions</h3>
          <p className="text-sm text-foreground pl-4">Current age range: "{ageRange(watchedStudy)}"</p>
          {ageFields.map(({ name, placeholder, label, desc }) => (
            <FormInput
              key={name}
              form={form}
              name={name}
              placeholder={placeholder}
              label={label}
              desc={desc}
            />
          ))}

          <h3 className="text-lg font-semibold">Study Timeline</h3>
          <p className="text-sm text-foreground pl-4">Current study timeline: "{timeline(watchedStudy)}"</p>
          {timelineFields.map(({ name, placeholder, label, desc }) => (
            <FormInput
              key={name}
              form={form}
              name={name}
              placeholder={placeholder}
              label={label}
              desc={desc}
            />
          ))}

          {/* <p>Estimated Remuneration: {displayRemuneration(watchedStudy)}</p> */}
          <FormInput
            form={form}
            name="remuneration"
            placeholder="Gratis"
            label="Estimated Remuneration"
            desc="The estimated compensation (in $US) for the participant for completing the study (can be zero)"
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Autosend Settings</h3>
            <p className="text-sm text-foreground pl-4">
              Include a survey link and/or personal message in the email participants receive when they
              connect to your study
            </p>

            <FormTextarea
              form={form}
              name="autosend_message"
              label="Autosend Message"
              placeholder="i.e. Thank you for your interest in our study! Please fill out the survey linked below and we will follow-up with you shortly."
              desc="Include an optional message to participants, with instructions or thanking them for their participation. If left blank this default message will be used instead:"
            />
            <p className="text-sm text-foreground pl-4">
              <i>
                {user.first_name} -- cc'd on this email -- will contact you soon to arrange completion of the
                study.
              </i>
            </p>
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

          <FormMessage />

          <div className="flex gap-4 justify-between">
            <div className="flex gap-4 justify-left">
              <Link
                href={`/r/studies/${study.id}`}
                as="button"
                className="border-[0.5px] border-black px-4 py-2 rounded-md"
              >
                Back
              </Link>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                href={`/r/studies/${study.id}/edit`}
                as="button"
                className="border-[0.5px] border-black px-4 py-2 rounded-md"
              >
                Discard Unsaved Changes
              </Link>
              <Button key="submit" type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default StudyEdit
