import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const TextInput = ({ form, name, placeholder, desc }) => {
  const InputField = ({ field, placeholder, desc }) => (
    <FormItem>
      <FormLabel>{placeholder}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      {!!desc && <FormDescription>{desc}</FormDescription>}
    </FormItem>
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <InputField field={field} placeholder={placeholder} desc={desc} />
      )}
    />
  )
}

export default TextInput
