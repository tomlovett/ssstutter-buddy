import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormTextarea = ({ form, name, label, placeholder, desc, ...props }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {!!label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            {...field}
            {...props}
          />
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
      </FormItem>
    )}
  />
)

export default FormTextarea
