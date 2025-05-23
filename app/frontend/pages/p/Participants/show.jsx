import { Mail, Cake, MapPin, LandPlot, UserPen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatBirthday, formatLocation } from '@/lib/utils'

const ParticipantShow = ({ participant }) => (
  <>
    <header className="flex flex-col lg:flex-row gap-4 mb-4">
      <div className="w-full lg:w-1/3 p-6 mb-2 rounded-md bg-blue-50">
        <h2 className="font-bold mb-4 text-2xl">Your profile</h2>
        <div className="my-2 flex items-center gap-4">
          <div className="flex flex-col">
            <p>
              {participant.first_name} {participant.last_name}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-gray-500">
                    @{participant.codename}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is your codename</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="my-4">
          <a href="Researcher/ParticipantSlice participant=participant">
            how researchers see you
          </a>
        </div>
      </div>
      <div className="w-full lg:w-2/3 p-6 mb-2 rounded-md bg-gray-100 drop-shadow-md">
        <div className="flex justify-between">
          <h3 className="font-semibold mb-4">Account details</h3>
          <Button
            href="#"
            className="rounded-lg lg:rounded-md"
            name="edit my info"
          >
            <UserPen className="inline-block" />
            <span className="hidden lg:inline-block">edit my info</span>
          </Button>
        </div>
        <ul className="list-none list-inside flex flex-col gap-2">
          <li>
            <Mail className="inline-block mr-4" />
            {participant.email}
          </li>
          <li>
            <Cake className="inline-block mr-4" />{' '}
            {formatBirthday(participant.birthdate)}
          </li>
          <li>
            <MapPin className="inline-block mr-4" />
            {formatLocation(
              participant.country,
              participant.state,
              participant.city
            )}
          </li>
          <li>
            <LandPlot className="inline-block mr-4" />
            <span className="font-semibold">
              Default distance setting:
            </span>{' '}
            {participant.default_distance} miles
          </li>
        </ul>
      </div>
    </header>

    <Separator />
  </>
)

// ParticipantShow.layout = page => <SideBarLayout title="Profile">{page}</SideBarLayout>

export default ParticipantShow
