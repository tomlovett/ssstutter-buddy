import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CustomSelect = ({ form, name, placeholder, options }) => {
  const RenderSelect = ({ field, placeholder, options }) => (
    <FormItem>
      <FormLabel>{placeholder}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-[125px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(({ key, value }) => (
            <SelectItem key={key} value={value}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )

  return (
    <FormField
      control={form.control}
      name={name}
      key={name}
      render={({ field }) => (
        <RenderSelect
          field={field}
          placeholder={placeholder}
          options={options}
        />
      )}
    />
  )
}

export default CustomSelect
