import { useState } from 'react'
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

const StepthroughModal = ({
  stepsData,
  onClickNext,
  onClickPrevious,
  onComplete,
  onCancel,
}) => {
  const [index, setIndex] = useState(0)

  const clickNext = () => {
    if (index == stepsData.length - 1) {
      onComplete()
      return
    }

    setIndex(index + 1)
    onClickNext()
  }

  const clickPrevious = () => {
    if (index == 0) {
      onCancel()
      return
    }

    setIndex(index - 1)
    onClickPrevious()
  }

  const ModalBody = () => stepsData[index]['body']

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Get Started</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{stepsData[index]['title']}</AlertDialogTitle>
          <AlertDialogDescription>
            <ModalBody />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={clickPrevious}>
            Previous
          </Button>
          <Button onClick={clickNext}>Next</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default StepthroughModal
