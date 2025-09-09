import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import LocationTool from '@/components/lib/LocationTool'
import { Button } from '@/components/ui/button'
import { Form, FormMessage, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import FormCheckboxes from '@/components/ui/custom/formCheckboxes'
import FormInput from '@/components/ui/custom/formInput'
import FormRadioGroup from '@/components/ui/custom/formRadioGroup'
import FormTextarea from '@/components/ui/custom/formTextarea'
import { Input } from '@/components/ui/input'
import { postRequest } from '@/lib/api'
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
  { id: 'Speaker panel', label: 'Speaker Panel' },
]

const MAX_IMAGE_SIZE = 2000 // pixels

const LOCATION_TYPES = [
  { value: 'digital', label: 'Digital Only' },
  { value: 'in_person', label: 'In-Person Only' },
  { value: 'hybrid', label: 'Hybrid' },
]

const StudyEdit = ({ study }) => {
  const [errors, setErrors] = useState([])
  const [flyerError, setFlyerError] = useState(null)
  const [flyerPreviewUrl, setFlyerPreviewUrl] = useState(null)
  const form = useForm({
    resolver: zodResolver(StudyInProgressSchema),
    defaultValues: {
      title: study.title || '',
      short_desc: study.short_desc || '',
      long_desc: study.long_desc || '',
      flyer: undefined,
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
    },
  })

  const watchedStudy = form.watch()

  const validateImage = file => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        if (img.width > MAX_IMAGE_SIZE || img.height > MAX_IMAGE_SIZE) {
          reject(`Image must be ${MAX_IMAGE_SIZE}x${MAX_IMAGE_SIZE} pixels or smaller`)
        } else {
          resolve(true)
        }
      }
      img.onerror = () => reject('Invalid image file')
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFlyerChange = async e => {
    const file = e.target.files?.[0]
    if (!file) return

    setFlyerError(null)
    setFlyerPreviewUrl(null)

    try {
      await validateImage(file)
      form.setValue('flyer', file, { shouldValidate: true })
      setFlyerPreviewUrl(URL.createObjectURL(file))
    } catch (error) {
      setFlyerError(error)
      form.setValue('flyer', undefined)
      e.target.value = '' // Reset the file input
    }
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (flyerPreviewUrl) {
        URL.revokeObjectURL(flyerPreviewUrl)
      }
    }
  }, [flyerPreviewUrl])

  const saveStudy = async studyValues => {
    const formData = new FormData()

    // Nest all form values under the 'study' key
    Object.entries(studyValues).forEach(([key, value]) => {
      if (key !== 'flyer' && value !== undefined) {
        formData.set(`study[${key}]`, value)
      }
    })

    const flyerFile = form.getValues('flyer')
    if (flyerFile instanceof File) {
      formData.set('study[flyer]', flyerFile)
    }

    try {
      const response = await fetch(`/r/studies/${study.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
          Accept: 'application/json',
        },
        credentials: 'same-origin',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast.success('Changes saved!', 6000)
    } catch (error) {
      console.error('Error saving changes:', error)
      toast.error('Failed to update study', 6000)
      throw error
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
          {topFormFields.map(({ name, label, placeholder, desc }) =>
            name == 'long_desc' ? (
              <FormTextarea
                key={name}
                form={form}
                name={name}
                label={label}
                placeholder={placeholder}
                desc={desc}
              />
            ) : (
              <FormInput key={name} form={form} name={name} placeholder={placeholder} desc={desc} />
            )
          )}

          <p>Location: {displayLocationShort(watchedStudy)}</p>

          <FormRadioGroup
            form={form}
            name="location_type"
            title="Location Type"
            subtitle="Select the type of location for this study"
            items={LOCATION_TYPES}
          />

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

          <FormCheckboxes
            form={form}
            title="Study Methodologies"
            subtitle="Select all that apply"
            name="methodologies"
            items={METHODOLOGIES}
          />

          <p>Age Range: {ageRange(watchedStudy)}</p>
          {ageFields.map(({ name, placeholder, desc }) => (
            <FormInput key={name} form={form} name={name} placeholder={placeholder} desc={desc} />
          ))}

          <p>Study timeline: {timeline(watchedStudy)}</p>
          {timelineFields.map(({ name, placeholder, desc }) => (
            <FormInput key={name} form={form} name={name} placeholder={placeholder} desc={desc} />
          ))}

          <p>Estimated Remuneration: {displayRemuneration(watchedStudy)}</p>
          <FormInput
            key={remuneration.name}
            form={form}
            name={remuneration.name}
            placeholder={remuneration.placeholder}
            desc={remuneration.desc}
          />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="flyer"
              render={() => (
                <FormItem>
                  <FormLabel>Study Flyer</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleFlyerChange} />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">Maximum image size: 2000x2000 pixels</p>
                  {flyerError && <p className="text-sm text-red-500">{flyerError}</p>}
                  {flyerPreviewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img
                        src={flyerPreviewUrl}
                        alt="Flyer preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormMessage />
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
        </form>
      </Form>
    </>
  )
}

export default StudyEdit
