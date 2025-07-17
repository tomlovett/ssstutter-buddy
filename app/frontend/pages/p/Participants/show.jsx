import { Link } from '@inertiajs/react'
import { Cake, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatBirthday, formatLocation } from '@/lib/utils'
import ParticipantPreview from '@/components/Participant/ParticipantPreview'

const ParticipantShow = ({ participant }) => (
  <div className="container mx-auto px-4 py-8">
    <h3 className="text-2xl font-bold mb-4">Your Participant Profile</h3>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="mb-4 ml-2">
          <p className="text-lg mb-2">
            {participant.first_name} {participant.last_name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-gray-500 ml-2">
                    @{participant.codename}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is your codename</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          <p className="text-gray-600">{participant.email}</p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg mb-2">Account Details</h3>
              <ul className="space-y-2 ml-2">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Location:</span>{' '}
                  {formatLocation(
                    participant.location.country,
                    participant.location.state,
                    participant.location.city
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <Cake className="w-4 h-4" />
                  <span className="font-medium">Birthday:</span>{' '}
                  {formatBirthday(participant.birthdate)}
                </li>
                {/* <li className="flex items-center gap-2">
                  <span className="font-medium">Default distance setting:</span>{' '}
                  {participant.default_distance} miles
                </li> */}
              </ul>
            </div>
            <div className="self-end">
              <Button asChild className="flex items-center gap-2">
                <Link href={`/p/participants/${participant.id}/edit`}>
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <ParticipantPreview participant={participant} />
        </div>
      </div>
    </div>
  </div>
)

export default ParticipantShow
