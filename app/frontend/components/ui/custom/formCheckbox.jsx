import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formCheckboxes = ({ form, title, subtitle, name, disabled }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel className="text-base">{title}</FormLabel>
          <FormDescription>{subtitle}</FormDescription>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default formCheckboxes
