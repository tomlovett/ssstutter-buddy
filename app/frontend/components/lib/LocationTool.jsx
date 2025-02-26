'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ComboBox } from '@/components/ui/combobox'
import Modal from '@/components/ui/custom/modal'
import countriesList from '@/lib/countriesList'

const LocationTool = ({ country, state, city }) => {
  const [currentCountry, setCurrentCountry] = useState(country || {})
  const [currentState, setCurrentState] = useState(state || {})
  const [currentCity, setCurrentCity] = useState(city || {})

  const [statesList, setStatesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  let enableSave = false
  enableSave = currentCountry?.name && currentState?.name && currentCity?.name

  const refreshLocation = async () => {
    await fetch('http://localhost:3001/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        country: currentCountry?.symbol || '',
        state: currentState?.symbol || '',
        city: currentCity?.symbol || '',
      }),
    })
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
    </>
  )

  return (
    <Modal
      buttonText="Edit Location"
      modalTitle="Location Selection"
      modalBody={<ModalBody />}
      enableSave={enableSave}
      onClickCancel={resetFields}
    />
  )
}

export default LocationTool
