import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormInput = ({ form, name, placeholder, desc, type }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{placeholder}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormInput
