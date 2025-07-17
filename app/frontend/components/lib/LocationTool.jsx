import { useEffect, useState } from 'react'
import { MapPin, X, CircleHelp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ComboBox } from '@/components/ui/combobox'
import Modal from '@/components/ui/custom/modal'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { postRequest } from '@/lib/api'
import countriesList from '@/lib/countriesList'

// TODO: convert so that it takes in strings for city/state/country and then the componentqueries the API for the rest of the data

const LocationTool = ({ country, state, city, onSave }) => {
  const [currentCountry, setCurrentCountry] = useState(country || {})
  const [currentState, setCurrentState] = useState(state || {})
  const [currentCity, setCurrentCity] = useState(city || {})

  const [statesList, setStatesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  let enableSave = false
  enableSave = currentCountry?.name && currentState?.name && currentCity?.name

  const refreshLocation = async () => {
    const body = {
      country: currentCountry?.symbol || '',
      state: currentState?.symbol || '',
      city: currentCity?.symbol || '',
    }

    postRequest('/api/location', body)
      .then(results => results.json())
      .then(({ states_list, cities_list }) => {
        setStatesList(states_list)
        setCitiesList(cities_list)
      })
  }

  useEffect(() => {
    refreshLocation()
  }, [currentCountry, currentState, currentCity])

  const resetFields = () => {
    setCurrentCountry(country)
    setCurrentState(state)
    setCurrentCity(city)
  }

  const clearCity = () => setCurrentCity({})

  const clearState = () => {
    clearCity()
    setCurrentState({})
  }
  const clearCountry = () => {
    clearState()
    setCurrentCountry({})
  }

  const ClearFieldIcon = ({ onClick }) => (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="h-8 w-8 p-0 hover:bg-gray-100"
    >
      <X className="h-4 w-4 text-orange-500 border border-orange-500 rounded-full" />
    </Button>
  )

  const LocationDisplay = () => (
    <div className="flex items-center gap-2 text-gray-600">
      <MapPin className="h-4 w-4" />
      <span>
        {!currentCountry.name || !currentState.name || !currentCity.name
          ? 'No Location Selected'
          : `${currentCity.name}, ${currentState.name}, ${currentCountry.name}`}
      </span>
    </div>
  )

  const ModalBody = () => (
    <div className="space-y-4 pb-4">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <label className="w-[30%] text-sm font-medium text-gray-700 whitespace-nowrap">
            Country
          </label>
          <div className="w-[60%]">
            <ComboBox
              key="country"
              placeholder="Select a country"
              selectedPair={currentCountry}
              valuesList={countriesList}
              onChange={pair => setCurrentCountry(pair)}
              disabled={!!currentState?.name}
              className="w-full"
            />
          </div>
          <div className="flex justify-end w-[10%]">
            {currentCountry?.name && <ClearFieldIcon onClick={clearCountry} />}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <label className="w-[30%] text-sm font-medium text-gray-700 whitespace-nowrap">
            State/Province
          </label>
          <div className="w-[60%]">
            <ComboBox
              key="state"
              placeholder="Select a state/province"
              selectedPair={currentState}
              valuesList={statesList}
              onChange={pair => setCurrentState(pair)}
              disabled={!currentCountry?.name || currentCity?.name}
              className="w-full"
            />
          </div>
          <div className="flex justify-end w-[10%]">
            {currentState?.name && <ClearFieldIcon onClick={clearState} />}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <label className="w-[30%] text-sm font-medium text-gray-700 whitespace-nowrap">
            City
          </label>
          <div className="w-[60%]">
            <ComboBox
              key="city"
              placeholder="Select a city"
              selectedPair={currentCity}
              valuesList={citiesList}
              onChange={pair => setCurrentCity(pair)}
              disabled={!currentState?.name}
              className="w-full"
            />
          </div>
          <div className="flex justify-end w-[10%]">
            {currentCity?.name && <ClearFieldIcon onClick={clearCity} />}
          </div>
        </div>
      </div>
    </div>
  )

  const MissingLocationTooltip = () => (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-1">
        Don't see your state or city?
        <CircleHelp className="h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent className="bg-gray-100 text-gray-700">
        Send an email to support@ssstutterbuddy.com and we'll add it for you!
      </TooltipContent>
    </Tooltip>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
        <LocationDisplay />
        <Modal
          buttonText="Edit Location"
          modalTitle="Location Selection"
          modalBody={<ModalBody />}
          tooltip={<MissingLocationTooltip />}
          enableSave={enableSave}
          onClickCancel={resetFields}
          onClickSave={() =>
            onSave({
              country: currentCountry,
              state: currentState,
              city: currentCity,
            })
          }
          buttonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        />
      </div>
    </div>
  )
}

export default LocationTool
