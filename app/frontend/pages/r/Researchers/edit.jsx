import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'
import FormTextarea from '@/components/ui/custom/formTextarea'
import { putRequest } from '@/lib/api'
import ResearcherSchema from '@/schemas/Researcher'

const formFieldData = [
  { name: 'titles', placeholder: 'Professional titles' },
  { name: 'institution', placeholder: 'Institutions' },
  { name: 'research_interests', placeholder: 'Research Interests' },
  {
    name: 'bio',
    placeholder: 'Professional Bio',
    desc: "Feel free to copy/paste directly from your institution's page",
  },
  {
    name: 'university_profile_url',
    placeholder: 'University URL',
    desc: "A link to your profile on your institution's website",
  },
]

const ResearcherEdit = ({ researcher }) => {
  const form = useForm({
    resolver: zodResolver(ResearcherSchema),
    defaultValues: {
      titles: researcher.titles || '',
      institution: researcher.institution || '',
      research_interests: researcher.research_interests || '',
      university_profile_url: researcher.university_profile_url || '',
      bio: researcher.bio || '',
    },
  })

  const saveResearcherChanges = async formValues =>
    await putRequest(`/r/researchers/${researcher.id}`, formValues).then(
      res => {
        const msg =
          res.status == '200'
            ? 'Changes saved!'
            : 'Uh oh, there was an error! Please refresh the page and try again.'

        toast(msg)
      }
    )

  return (
    <>
      <h3>{researcher.professional_name}</h3>
      <p>
        A core tenet of SSStutterBuddy is that PWS will be more likely to engage
        with researchers they see as more human and accessible. The information
        on this profile will help them feel more comfortable engaging in studies
        with you, and may help allay nerves or doubts about participating in
        studies conducted by you.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveResearcherChanges)}
          className="w-2/3 space-y-6"
        >
          {formFieldData.map(({ name, placeholder, desc }) =>
            ['bio', 'research_interests'].includes(name) ? (
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
          <FormMessage />
          <Link href={`/r/researchers/${researcher.id}/edit`} as="button">
            Cancel
          </Link>
          <Button key="submit" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ResearcherEdit
