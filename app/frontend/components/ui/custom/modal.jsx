import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const Modal = ({
  buttonText,
  modalTitle,
  modalBody,
  tooltip,
  enableSave,
  onClickCancel,
  onClickSave,
}) => {
  const SaveButton = () =>
    enableSave ? (
      <AlertDialogAction onClick={onClickSave}>Save Changes</AlertDialogAction>
    ) : (
      <Button disabled>Save Changes</Button>
    )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="pb-4">
          <VisuallyHidden>
            <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription>{modalBody}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="h-4 border-b border-gray-400" />
        <AlertDialogFooter className="flex justify-between items-center">
          <div className="flex-1">{tooltip}</div>
          <div className="flex gap-2">
            <AlertDialogCancel onClick={onClickCancel}>
              Cancel
            </AlertDialogCancel>
            <SaveButton />
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal
