import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import rehypeSanitize from 'rehype-sanitize'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'

const MarkdownEditorField = ({ field, ...props }) => (
  <div className="border border-black" data-color-mode="light">
    <MDEditor
      value={field.value || ''}
      onChange={value => {
        field.onChange(value || '')
      }}
      preview="edit"
      hideToolbar={false}
      visibleDragBar={true}
      height={400}
      minHeight={200}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      {...props}
    />
  </div>
)

const FormMarkdownEditor = ({ form, name, label, placeholder, desc, ...props }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {!!label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <MarkdownEditorField field={field} placeholder={placeholder} {...props} />
        </FormControl>
        {!!desc && <FormDescription>{desc}</FormDescription>}
        <FormDescription>
          To see a preview of your markdown, click the "][" button on the right side of the editor
        </FormDescription>
      </FormItem>
    )}
  />
)

export default FormMarkdownEditor
