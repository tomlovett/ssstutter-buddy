import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import StepthroughModal from '@/components/lib/StepthroughModal'
import UserSchema from '@/schemas/User'

const ParticipantNew = ({ participant }) => {
  const [participantValues, setParticipantValues] = useState(participant)

  // putting form on page; can I get away with only showing some of it; will the data persist?

  const form = useForm({
    resolver: zodResolver(UserSchema),
    firstName: participant.first_name || '',
    lastName: participant.last_name || '',
    email: participant.email || '',
    codename: participant.codename || '',
    birthdate: participant.birthdate || '',
    defaultDistance: participant.default_distance || 50,
    gender: participant.gender || '',
  })

  const onSubmit = data => onComplete(data)

  const NameStep = () => (
    <>
      <Input
        form={form}
        key="firstName"
        name="firstName"
        placeholder="First name"
      />
      <Input
        form={form}
        key="lastName"
        name="lastName"
        placeholder="Last name"
      />
    </>
  )

  const DistanceAndGender = () => (
    <>
      <Input
        key="defaultDistance"
        form={form}
        name="defaultDistance "
        placeholder="Default study distance"
        desc={
          'The distance at which studies will be shown to you. It is best to set a longer distance than a shorter one'
        }
      />
      <Select
        form={form}
        name="gender"
        placeholder="Biological Gender"
        options={[
          { key: 'F', value: 'f' },
          { key: 'M', value: 'm' },
        ]}
      />
    </>
  )

  const steps = [
    {
      title: "Let's get started!",
      body: 'We just need to you a few questions to get your account all setup',
    },
    { title: 'Your name', body: <NameStep /> },
    {
      title: 'Your Email',
      body: <Input name="email" placeholder="email" />,
    },
    {
      title: 'Your Birthdate',
      body: (
        <Input
          form={form}
          name="birthdate"
          placeholder="Birthdate (YYYY-MM-DD)"
        />
      ),
    },
    {
      title: 'Your study data',
      body: <DistanceAndGender />,
    },
  ]

  const onClickNext = () => {
    // z.parse using index
    // send update request
    console.log('participants/new -> onClickNext')
  }

  const onComplete = () => {
    console.log('participants/new -> onComplete')
    form.handleSubmit(saveData())
  }

  const saveData = formData => {
    console.log('saveData -> formData:', formData)
  }

  const onCancel = () => {
    console.log('participants/new -> onCancel')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepthroughModal
          stepsData={steps}
          onClickNext={onClickNext}
          onClickPrevious={() => {}}
          onComplete={onComplete}
          onCancel={onCancel}
        />
      </form>
    </Form>
  )
}

export default ParticipantNew
