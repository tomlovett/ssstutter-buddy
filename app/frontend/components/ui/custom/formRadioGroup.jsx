import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const FormRadioGroup = ({ form, name, title, subtitle, items, className }) => {
  const RadioItem = ({ field, item }) => (
    <FormItem
      key={item.value}
      className="flex flex-row items-start space-x-3 space-y-0"
    >
      <FormControl>
        <input
          type="radio"
          id={item.value}
          value={item.value}
          checked={field.value === item.value}
          onChange={e => field.onChange(e.target.value)}
          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
        />
      </FormControl>
      <FormLabel htmlFor={item.value} className="text-sm font-normal">
        {item.label}
      </FormLabel>
    </FormItem>
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="mb-4">
            <FormLabel className="text-base">{title}</FormLabel>
            {subtitle && <FormDescription>{subtitle}</FormDescription>}
          </div>
          <div className="flex gap-4">
            {items.map(item => (
              <RadioItem key={item.value} field={field} item={item} />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormRadioGroup
