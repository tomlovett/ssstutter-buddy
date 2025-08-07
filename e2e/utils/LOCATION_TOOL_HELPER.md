# E2E Test Utilities

This directory contains utility functions for end-to-end testing with Playwright.

## LocationTool Helper

The `location-tool-helper.js` file provides helper functions for interacting with the LocationTool component, which is used for setting and managing location information (country, state/province, city) in the application.

### Overview

The LocationTool component is a modal-based interface that allows users to:

- Select a country from a dropdown
- Select a state/province from a dropdown (populated based on selected country)
- Select a city from a dropdown (populated based on selected state)
- Clear individual fields using red X buttons
- Save or cancel location changes

The helper functions use `data-testid` attributes for reliable element targeting, making them more robust than index-based selection.

### Available Functions

#### `openLocationTool(page)`

Opens the LocationTool modal by clicking the "Edit Location" button.

```javascript
import { openLocationTool } from './utils/location-tool-helper'

await openLocationTool(page)
```

#### `setCountry(page, countryName)`

Sets the country in the LocationTool modal. Automatically clears dependent fields (state, city) if the country ComboBox is disabled.

```javascript
import { setCountry } from './utils/location-tool-helper'

await setCountry(page, 'United States')
```

#### `setState(page, stateName)`

Sets the state/province in the LocationTool modal. Automatically clears dependent fields (city) if the state ComboBox is disabled.

```javascript
import { setState } from './utils/location-tool-helper'

await setState(page, 'California')
```

#### `setCity(page, cityName)`

Sets the city in the LocationTool modal.

```javascript
import { setCity } from './utils/location-tool-helper'

await setCity(page, 'San Francisco')
```

#### `clearCountry(page)`

Clears the selected country by clicking the red X button.

```javascript
import { clearCountry } from './utils/location-tool-helper'

await clearCountry(page)
```

#### `clearState(page)`

Clears the selected state/province by clicking the red X button.

```javascript
import { clearState } from './utils/location-tool-helper'

await clearState(page)
```

#### `clearCity(page)`

Clears the selected city by clicking the red X button.

```javascript
import { clearCity } from './utils/location-tool-helper'

await clearCity(page)
```

#### `saveLocation(page)`

Saves the location changes by clicking the "Save Changes" button.

```javascript
import { saveLocation } from './utils/location-tool-helper'

await saveLocation(page)
```

#### `cancelLocation(page)`

Cancels the location changes by clicking the "Cancel" button.

```javascript
import { cancelLocation } from './utils/location-tool-helper'

await cancelLocation(page)
```

#### `setCompleteLocation(page, { country, state, city })`

Sets a complete location (country, state, city) in one operation, but does NOT save the changes.

```javascript
import { setCompleteLocation } from './utils/location-tool-helper'

await setCompleteLocation(page, {
  country: 'United States',
  state: 'California',
  city: 'San Francisco',
})
```

#### `setLocationAndSave(page, { country, state, city })`

Sets a complete location (country, state, city) in one operation AND saves the changes.

```javascript
import { setLocationAndSave } from './utils/location-tool-helper'

await setLocationAndSave(page, {
  country: 'United States',
  state: 'California',
  city: 'San Francisco',
})
```

#### `expectLocationDisplay(page, stringToMatch)`

Verifies that the location is displayed correctly in the LocationTool component. Takes a string to match against the location display text.

```javascript
import { expectLocationDisplay } from './utils/location-tool-helper'

// For a complete location
await expectLocationDisplay(page, 'San Francisco, California, United States')

// For no location selected
await expectLocationDisplay(page, 'No Location Selected')
```

### Usage Examples

#### Basic Usage

```javascript
import { test, expect } from '@playwright/test'
import { openLocationTool, setCountry, setState, setCity, saveLocation } from './utils/location-tool-helper'

test('can set a location', async ({ page }) => {
  // Navigate to a page with LocationTool
  await page.goto('/p/participants/1/edit')

  // Open the LocationTool modal
  await openLocationTool(page)

  // Set the location step by step
  await setCountry(page, 'United States')
  await setState(page, 'California')
  await setCity(page, 'San Francisco')

  // Save the location
  await saveLocation(page)
})
```

#### Using Convenience Functions

```javascript
import { test, expect } from '@playwright/test'
import { setCompleteLocation, setLocationAndSave, expectLocationDisplay } from './utils/location-tool-helper'

test('can set a complete location without saving', async ({ page }) => {
  // Navigate to a page with LocationTool
  await page.goto('/p/participants/1/edit')

  // Set a complete location in one operation (without saving)
  await setCompleteLocation(page, {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
  })

  // The modal is still open, you can make additional changes or save manually
  await saveLocation(page)
})

test('can set a complete location and save', async ({ page }) => {
  // Navigate to a page with LocationTool
  await page.goto('/p/participants/1/edit')

  // Set a complete location in one operation and save
  await setLocationAndSave(page, {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
  })

  // Verify the location is displayed correctly
  await expectLocationDisplay(page, 'San Francisco, California, United States')
})
```

#### Clearing Location Fields

```javascript
import { test, expect } from '@playwright/test'
import {
  openLocationTool,
  clearCountry,
  clearState,
  clearCity,
  saveLocation,
} from './utils/location-tool-helper'

test('can clear location fields', async ({ page }) => {
  // Navigate to a page with LocationTool
  await page.goto('/p/participants/1/edit')

  // Open the LocationTool modal
  await openLocationTool(page)

  // Clear individual fields
  await clearCity(page)
  await clearState(page)
  await clearCountry(page)

  // Save the changes
  await saveLocation(page)
})
```

### Technical Details

#### Element Targeting

The helper functions use `data-testid` attributes for reliable element targeting:

- **ComboBoxes**: `country-combobox`, `state-combobox`, `city-combobox`
- **Clear buttons**: `clear-country`, `clear-state`, `clear-city`

This approach is more robust than index-based selection and won't break if the order of elements changes.

#### Disabled ComboBox Handling

The helper automatically handles disabled ComboBoxes by:

1. **Country ComboBox**: Clears state and city if disabled
2. **State ComboBox**: Clears city if disabled
3. **City ComboBox**: No dependent fields to clear

This ensures that the ComboBoxes are always enabled before attempting to interact with them.

#### Input Handling

The helper uses a two-step approach for ComboBox interactions:

1. **Clear and fill**: Clears the CommandInput field, then types the exact value
2. **Wait and click**: Waits for the specific option to be available, then clicks it

This approach handles the fuzzy matching behavior of the Command component and ensures the correct option is selected.

### Notes

- All functions include appropriate waits and timeouts to handle the asynchronous nature of the LocationTool component
- The helper functions handle the ComboBox interactions that require special attention in Playwright
- Clear functions check if the clear button is visible before attempting to click it
- The `setCompleteLocation` function is a convenience function that combines opening the modal, setting all fields, but does NOT save
- The `setLocationAndSave` function is a convenience function that combines opening the modal, setting all fields, and saving
- The `expectLocationDisplay` function takes a string parameter to match against the location display text
