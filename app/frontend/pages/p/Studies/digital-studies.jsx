import { Link } from '@inertiajs/react'

import StudyTable from 'components/Participant/StudyTable'
import { Button } from '@/components/ui/button'

const DigitalStudies = ({ studies, pagination }) => {
  const { current_page, total_pages, total_count } = pagination

  console.log(pagination)

  const PaginationControls = () => (
    <div className="mt-6 flex items-center justify-between mb-4">
      <div className="text-sm text-gray-700">
        Showing page {current_page} of {total_pages} ({total_count} total
        studies)
      </div>
      <div className="flex gap-2">
        <Button asChild disabled={current_page == 1}>
          <Link
            href={`/p/digital-studies?page=${current_page - 1}`}
            preserveScroll
          >
            Previous
          </Link>
        </Button>
        <Button asChild disabled={current_page === total_pages}>
          <Link
            href={`/p/digital-studies?page=${current_page + 1}`}
            preserveScroll
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Digital-Friendly Studies</h3>

      {total_pages > 1 && <PaginationControls />}

      <StudyTable
        studies={studies}
        nullStatement="There are currently no digital studies, or you have already connected to all of them"
      />

      {total_pages > 1 && <PaginationControls />}
    </>
  )
}

export default DigitalStudies
