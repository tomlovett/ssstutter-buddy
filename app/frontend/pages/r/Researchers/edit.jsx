import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import ResearcherSchema from '@/schemas/Researcher'
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formFieldData = [
  {
    name: 'titles',
    label: 'Professional titles',
    placeholder: 'e.g. SLP, PhD, etc.',
  },
  { name: 'institution', label: 'Institutions' },
  { name: 'research_interests', label: 'Research Interests' },
  {
    name: 'bio',
    label: 'Professional Bio',
    desc: "Feel free to copy/paste directly from your institution's page",
  },
  {
    name: 'university_profile_url',
    label: 'University URL',
    desc: "A link to your personal webpage or profile on your institution's website",
  },
]

const MAX_IMAGE_SIZE = 2000 // pixels

const ResearcherEdit = ({ researcher, is_complete }) => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [imageError, setImageError] = useState(null)

  const form = useForm({
    resolver: zodResolver(ResearcherSchema),
    defaultValues: {
      titles: researcher.titles || '',
      institution: researcher.institution || '',
      research_interests: researcher.research_interests || '',
      university_profile_url: researcher.university_profile_url || '',
      bio: researcher.bio || '',
      headshot: undefined,
    },
  })

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

  const handleImageChange = async e => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageError(null)
    setPreviewUrl(null)

    try {
      await validateImage(file)
      form.setValue('headshot', file, { shouldValidate: true })
      setPreviewUrl(URL.createObjectURL(file))
    } catch (error) {
      setImageError(error)
      form.setValue('headshot', undefined)
      e.target.value = '' // Reset the file input
    }
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const saveResearcherChanges = async formValues => {
    const formData = new FormData()

    // Nest all form values under the 'researcher' key
    Object.entries(formValues).forEach(([key, value]) => {
      if (key !== 'headshot' && value !== undefined) {
        formData.set(`researcher[${key}]`, value)
      }
    })

    const headshotFile = form.getValues('headshot')
    if (headshotFile instanceof File) {
      formData.set('researcher[headshot]', headshotFile)
    }

    try {
      const response = await fetch(`/r/researchers/${researcher.id}`, {
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

      toast('Changes saved!')
    } catch (error) {
      console.error('Error saving changes:', error)
      toast('Uh oh, there was an error! Please refresh the page and try again.')
      throw error
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[80%]">
      {!is_complete && (
        <div className="flex text-center justify-center items-center mb-4 bg-yellow-100 p-4 rounded-md">
          <p className="text-md">Please complete your profile in order to start recruiting participants.</p>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">{researcher.professional_name}</h3>
      <p className="mb-4">
        A core tenet of SSStutterBuddy is that PWS may be intimidated by the research process, but they will
        also be more likely to engage with researchers who they see as more human and accessible.
        <br />
        <br />
        The information on your profile will help them feel more comfortable engaging in studies with you.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveResearcherChanges)} className="w-2/3 space-y-6">
          {formFieldData.map(({ name, label, placeholder, desc }) =>
            ['bio', 'research_interests'].includes(name) ? (
              <FormTextarea
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
                label={label}
                placeholder={placeholder}
                desc={desc}
              />
            )
          )}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="headshot"
              render={() => (
                <FormItem>
                  <FormLabel>Headshot</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                  </FormControl>
                  {imageError && <p className="text-sm text-red-500">{imageError}</p>}
                  {previewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img
                        src={previewUrl}
                        alt="Headshot preview"
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
          <div className="flex gap-4 justify-inbetween">
            <div className="flex gap-4">
              <Link href={`/r/researchers/${researcher.id}`} as="button">
                Back to Profile
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href={`/r/researchers/${researcher.id}`} as="button">
                Cancel
              </Link>
              <Button key="submit" type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ResearcherEdit
