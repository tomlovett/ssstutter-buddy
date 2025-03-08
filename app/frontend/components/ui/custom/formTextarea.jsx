import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormTextarea = ({ form, name, placeholder, desc }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{placeholder}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            {...field}
          />
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
      </FormItem>
    )}
  />
)

export default FormTextarea
