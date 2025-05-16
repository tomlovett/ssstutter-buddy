import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { postRequest } from '@/lib/api'

export function CreateStudyModal() {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  const handleCreateStudy = async () => {
    if (title.length < 6) {
      setError('Title must be at least 6 characters long')
      setIsOpen(true)
      return
    }

    console.log('Creating study with title:', title)

    try {
      await postRequest('/r/studies', { title })

      setIsOpen(false)
    } catch (_error) {
      console.error('Error creating study:', _error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create Study
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Study</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the title of your study.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Study Title</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter study title"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Button below mimics appearance of AlertDialogAction */}
          <button
            onClick={handleCreateStudy}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Create Study
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
