import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formCheckboxes = ({ form, title, subtitle, name, items }) => {
  const ItemCheckbox = ({ field, item }) => (
    <FormItem
      key={item.id}
      className="flex flex-row items-start space-x-3 space-y-0"
    >
      <FormControl>
        <Checkbox
          checked={field.value?.includes(item.id)}
          onCheckedChange={checked =>
            checked
              ? field.onChange([...field.value, item.id])
              : field.onChange(field.value?.filter(value => value !== item.id))
          }
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
    </FormItem>
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{title}</FormLabel>
            <FormDescription>{subtitle}</FormDescription>
          </div>
          {items.map(item => (
            <FormField
              key={item.id}
              control={form.control}
              name={name}
              render={({ field }) => <ItemCheckbox field={field} item={item} />}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default formCheckboxes
