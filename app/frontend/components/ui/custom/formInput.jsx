import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormInput = ({
  form,
  name,
  label,
  placeholder,
  desc,
  type,
  disabled,
  onChange,
  className,
}) => (
  <FormField
    control={form.control}
    name={name}
    disabled={disabled}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === 'file' ? (
            <Input
              type="file"
              placeholder={placeholder}
              label={label}
              onChange={onChange}
              accept={field.accept}
            />
          ) : (
            <Input
              placeholder={placeholder}
              label={label}
              type={type}
              {...field}
            />
          )}
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormInput
