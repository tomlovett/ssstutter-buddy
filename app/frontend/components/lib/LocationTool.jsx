'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ComboBox } from '@/components/ui/combobox'
import Modal from '@/components/ui/custom/modal'
import countriesList from '@/lib/countriesList'

const LocationTool = ({ country, state, city }) => {
  const [currentCountry, setCurrentCountry] = useState(country)
  const [currentState, setCurrentState] = useState(state)
  const [currentCity, setCurrentCity] = useState(city)

  const [statesList, setStatesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  const [enableSave, setEnableSave] = useState(
    currentCountry?.name && currentState?.name && currentCity?.name
  )
  const [isLoading, setIsLoading] = useState(false)

  const refreshLocation = async () => {
    const response = await fetch('http://localhost:3000/api/location', {
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
        console.log(
          'states_list',
          states_list.map(s => s.symbol)
        )
        setStatesList(states_list)
        setCitiesList(cities_list)
      })
      .then(() => {
        console.log('citiesList.length:', citiesList.length)
        console.log('statesList.length:', statesList.length)
      })
  }

  useEffect(() => {
    console.log('useEfect called on change')
    console.log(
      'current -> country/state/city:',
      currentCountry,
      currentState,
      currentCity
    )
    refreshLocation()
  }, [currentCountry, currentState, currentCity])

  const resetFields = () => {
    setCurrentCountry(country)
    setCurrentState(state)
    setCurrentCity(city)
  }

  const clearCity = () => setCurrentCity({})

  const clearState = () => {
    setCurrentState({})
    clearCity()
  }
  const clearCountry = () => {
    setCurrentCountry({})
    clearState()
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
        defaultValue={currentCountry}
        valuesList={countriesList}
        onChange={pair => {
          console.log('Country - onChange -> pair:', pair)
          setCurrentCountry(pair)
          console.log('currentCountry:', currentCountry)
        }}
        disabled={!!currentState?.name}
      />
      {currentCountry?.name && <ClearFieldIcon onClick={clearCountry} />}
      <br />
      <ComboBox
        key="state"
        placeholder="State"
        defaultValue={currentState}
        valuesList={statesList}
        onChange={pair => {
          console.log('state - onChange -> pair:', pair)
          // setCurrentState(pair)
          setCurrentCity(pair.symbol === currentState?.symbol ? {} : item)
        }}
        disabled={!currentCountry?.name || currentCity?.name}
      />
      {currentState?.name && <ClearFieldIcon onClick={clearState} />}
      <br />
      <ComboBox
        key="city"
        placeholder="City"
        defaultValue={currentCity}
        valuesList={citiesList}
        onChange={pair => {
          console.log('city onChange -> pair:', pair)
          // item.symbol === selectedPair?.symbol ? {} : item
          setCurrentCity(pair.symbol === currentCity?.symbol ? {} : item)
          // setCurrentCity(pair)
        }}
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
