import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import LocationTool from '@/components/lib/LocationTool'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import FormCheckbox from '@/components/ui/custom/formCheckbox'
import FormCheckboxes from '@/components/ui/custom/formCheckboxes'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import { putRequest } from '@/lib/api'
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
  { name: 'title', placeholder: 'Study Title' },
  {
    name: 'short_desc',
    placeholder: 'Short Description',
    desc: 'A sentence or two describing the study',
  },
  {
    name: 'long_desc',
    placeholder: 'Long Description',
    desc: 'Describe the study in as much detail as you like, letting the participant know what to expect, and what will be required of them',
  },
]

const ageFields = [
  {
    name: 'min_age',
    placeholder: 'Minimum allowable age of participants',
    desc: 'Leave blank if there is no minimum age constraint',
  },
  {
    name: 'max_age',
    placeholder: 'Maximum allowable age of participants',
    desc: 'Leave blank if there is no maximum age constraint',
  },
]

const timelineFields = [
  {
    name: 'total_hours',
    placeholder: 'Total number of hours required to complete study',
    desc: 'Use fractions to denote minutes. i.e. .75 hours for 45 minutes',
  },
  {
    name: 'total_sessions',
    placeholder: 'Number of expected sessions required to complete study',
  },
  {
    name: 'duration',
    placeholder: 'Overall timeline for study completion',
    desc: 'i.e. "1 week," " 2 days," or "3 months"',
  },
]

const remuneration = {
  name: 'remuneration',
  placeholder: 'Estimated remuneration for the participant (in USD)',
}

const METHODOLOGIES = [
  { id: 'Survey', label: 'Survey' },
  { id: 'Interview', label: 'Interview' },
  { id: 'Task performance', label: 'Task Performance' },
  { id: 'Brain imaging', label: 'Brain Imaging' },
  { id: 'Speech intervention', label: 'Speech Intervention' },
  { id: 'Behavioral intervention', label: 'Behavioral Intervention' },
  { id: 'Genetic sample collection', label: 'Genetic Sample Collection' },
  { id: 'Pharmaceutical trial', label: 'Pharmaceutical' },
]

const StudyEdit = ({ study }) => {
  const [errors, setErrors] = useState([])
  const form = useForm({
    resolver: zodResolver(StudyInProgressSchema),
    defaultValues: {
      title: study.title || '',
      short_desc: study.short_desc || '',
      long_desc: study.long_desc || '',
      methodologies: study.methodologies?.split(',') || [],
      country: study.country || '',
      state: study.state || '',
      city: study.city || '',
      digital_friendly: study.digital_friendly || false,
      digital_only: study.digital_only || false,
      min_age: study.min_age || 18,
      max_age: study.max_age || '',
      total_hours: study.total_hours || '',
      total_sessions: study.total_sessions || '',
      duration: study.duration || '',
      remuneration: study.remuneration || '',
      open_date: study.open_date || '',
    },
  })

  const watchedStudy = form.watch()

  const saveStudy = async studyValues => {
    const { isValid, errors } = validateStudy(studyValues)
    setErrors(errors)

    if (!isValid) {
      return
    }

    try {
      await putRequest(`/r/studies/${study.id}`, studyValues)
      toast.success('Changes saved!')
    } catch (_error) {
      console.log(_error)
      toast.error('Failed to update study')
    }
  }

  const saveFormChanges = formValues => {
    const refinedValues = Object.assign({}, formValues)
    refinedValues.methodologies = formValues.methodologies.join(',')

    saveStudy(refinedValues)
  }

  const saveLocationChanges = locationData => {
    const parsedData = {
      country: locationData.country?.symbol,
      state: locationData.state?.symbol,
      city: locationData.city?.symbol,
    }

    saveStudy(parsedData)
  }

  // validateCanPublish

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
          <Button onClick={() => saveStudy({ published_at: new Date() })}>
            Publish
          </Button>
        )}
        {displayList.pause && (
          <Button onClick={() => saveStudy({ paused_at: new Date() })}>
            Pause
          </Button>
        )}
        {displayList.resume && (
          <Button onClick={() => saveStudy({ paused_at: null })}>Resume</Button>
        )}
        {displayList.close && (
          <Button onClick={() => saveStudy({ closed_at: new Date() })}>
            Close
          </Button>
        )}
        {displayList.reopen && (
          <Button
            onClick={() => saveStudy({ closed_at: null, paused_at: null })}
          >
            Reopen
          </Button>
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
        <p>
          More information is required to publish this study. Please fill out
          the following fields:
        </p>
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
        <form
          onSubmit={form.handleSubmit(saveFormChanges)}
          className="w-2/3 space-y-6"
        >
          {topFormFields.map(({ name, placeholder, desc }) =>
            name == 'long_desc' ? (
              <FormTextarea
                key={name}
                form={form}
                name={name}
                placeholder={placeholder}
                desc={desc}
              />
            ) : (
              <FormInput
                key={name}
                form={form}
                name={name}
                placeholder={placeholder}
                desc={desc}
              />
            )
          )}

          <p>Location: {displayLocationShort(watchedStudy)}</p>

          <FormCheckbox
            key="digital_only"
            name="digital_only"
            title="This study must be completed online"
            form={form}
          />
          <FormCheckbox
            key="digital_friendly"
            name="digital_friendly"
            title="This study can be done online"
            form={form}
          />

          <LocationTool
            disabled={watchedStudy.digital_only}
            country={watchedStudy.country}
            state={watchedStudy.state}
            city={watchedStudy.city}
            onSave={locationValues => saveLocationChanges(locationValues)}
          />

          <FormCheckboxes
            form={form}
            title="Study Methodologies"
            subtitle="Select all that apply"
            name="methodologies"
            items={METHODOLOGIES}
          />

          <p>Age Range: {ageRange(watchedStudy)}</p>
          {ageFields.map(({ name, placeholder, desc }) => (
            <FormInput
              key={name}
              form={form}
              name={name}
              placeholder={placeholder}
              desc={desc}
            />
          ))}

          <p>Study timeline: {timeline(watchedStudy)}</p>
          {timelineFields.map(({ name, placeholder, desc }) => (
            <FormInput
              key={name}
              form={form}
              name={name}
              placeholder={placeholder}
              desc={desc}
            />
          ))}

          <p>Estimated Remuneration: {displayRemuneration(watchedStudy)}</p>
          <FormInput
            key={remuneration.name}
            form={form}
            name={remuneration.name}
            placeholder={remuneration.placeholder}
            desc={remuneration.desc}
          />

          <FormMessage />
          <div className="flex gap-4">
            <Link href={`/r/studies/${study.id}/edit`} as="button">
              Discard Changes
            </Link>
            <Button key="submit" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default StudyEdit
