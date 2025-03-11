import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ComboBox } from '@/components/ui/combobox'
import Modal from '@/components/ui/custom/modal'
import { postRequest } from '@/lib/api'
import countriesList from '@/lib/countriesList'

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
    <Button onClick={() => onClick()} variant="destructive">
      X
    </Button>
  )

  const LocationDisplay = () =>
    !currentCountry.name || !currentState.name || !currentCity.name
      ? 'Editing...'
      : `${currentCity.name}, ${currentState.name}, ${currentCountry.name}`

  const ModalBody = () => (
    <>
      <ComboBox
        key="country"
        placeholder="Country"
        selectedPair={currentCountry}
        valuesList={countriesList}
        onChange={pair => setCurrentCountry(pair)}
        disabled={!!currentState?.name}
      />
      {currentCountry?.name && <ClearFieldIcon onClick={clearCountry} />}
      <br />
      <ComboBox
        key="state"
        placeholder="State"
        selectedPair={currentState}
        valuesList={statesList}
        onChange={pair => setCurrentState(pair)}
        disabled={!currentCountry?.name || currentCity?.name}
      />
      {currentState?.name && <ClearFieldIcon onClick={clearState} />}
      <br />
      <ComboBox
        key="city"
        placeholder="City"
        selectedPair={currentCity}
        valuesList={citiesList}
        onChange={pair => setCurrentCity(pair)}
        disabled={!currentState?.name}
      />
      {currentCity?.name && <ClearFieldIcon onClick={clearCity} />}
      {/* Tooltip:
        Is your state or city missing from this list? Send an email to support@ssstutterbuddy.com and we'll add it for you.
         */}
    </>
  )

  return (
    <>
      <LocationDisplay />
      <Modal
        buttonText="Edit Location"
        modalTitle="Location Selection"
        modalBody={<ModalBody />}
        enableSave={enableSave}
        onClickCancel={resetFields}
        onClickSave={() =>
          onSave({
            country: currentCountry,
            state: currentState,
            city: currentCity,
          })
        }
      />
    </>
  )
}

export default LocationTool
