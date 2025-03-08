import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormInput = ({ form, name, placeholder, desc }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{placeholder}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
      </FormItem>
    )}
  />
)

export default FormInput
