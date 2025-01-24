import React, { useState, useEffect } from 'react'

const LocationTool = ({ country, state, city }) => {
  const [currentCountry, setCurrentCountry] = useState(country)
  const [currentState, setCurrentState] = useState(state)
  const [currentCity, setCurrentCity] = useState(city)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidLocation, setIsValidLocation] = useState(null)

  useEffect(() => verifyLocation)

  const onChangeCountry = (countryText) => {
    setCurrentState('')
    setCurrentCity('')
    setCurrentCountry(countryText)
  }

  const onChangeState = (stateText) => {
    setCurrentCity('')
    setCurrentState(stateText)
  }

  const onChangeCity = (cityText) => {
    setCurrentCity(cityText)
  }

  const hasAllFields = () => currentCountry && currentState && currentCity

  const verifyLocation = () => {
    console.log('verifying location')
    if (!hasAllFields) {
      return false
    }

    setIsLoading(true)

    console.log('pinging API to verify address')

    // ping API to confirm address can be found
    // set all fields to sanitized versions returned by API

    setIsValidLocation(true)

    setIsLoading(false)

    return true
  }

  const InputField = ({ name, currentValue, onValueChange }) => (
    <input
      name={name}
      alt={name}
      type="text"
      value={currentValue}
      onChange={({ value }) => onValueChange(value)}
      disabled={isLoading}
      onBlur={() => verifyLocation()}
    />
  )

  return (
    <>
      <p>Is valid location: {isValidLocation}</p>
      <InputField
        key="country"
        name={'country'}
        currentValue={currentCountry}
        onValueChange={({ target }) => onChangeCountry(target.value)}
      />
      <br />
      <InputField
        key="state"
        name={'state'}
        currentValue={currentState}
        onValueChange={({ target }) => onChangeState(target.value)}
      />
      <br />
      <InputField
        key="city"
        name={'city'}
        currentValue={currentCity}
        onValueChange={({ target }) => onChangeCity(target.value)}
      />
    </>
  )
}

export default LocationTool
