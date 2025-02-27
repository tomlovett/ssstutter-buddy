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
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription>{modalBody}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClickCancel}>Cancel</AlertDialogCancel>
          <SaveButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal
