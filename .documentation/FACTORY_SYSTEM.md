# Factory System for E2E Testing

## Overview

This project uses a **Factory Pattern** for generating test data in E2E tests, similar to Factory Bot in Rails. The system provides:

- **Dynamic data generation** using Faker.js
- **ES6 classes and modules** - No TypeScript required
- **Rails model mirroring** - factories match your Rails models
- **Flexible overrides** - customize any field
- **Database seeding** - programmatic test data creation

## Libraries Used

### **@faker-js/faker**

- ✅ **Modern Faker.js** - Official successor to Faker.js
- ✅ **ES6 support** - Full ES6 module support
- ✅ **Comprehensive data types** - Names, emails, addresses, etc.
- ✅ **Localization support** - Multiple languages
- ✅ **Active development** - Well-maintained

## Factory Structure

```
e2e/factories/
└── user-factory.js          # All factories in one file
    ├── UserFactory          # User data factories
    ├── StudyFactory         # Study data factories
    └── LocationFactory      # Location data factories
```

## Available Factories

### **UserFactory**

```javascript
// Basic user creation
UserFactory.createUser()
UserFactory.createUser({ email: 'custom@example.com' })

// Role-specific factories
UserFactory.createParticipant()
UserFactory.createResearcher()

// Combined factories
UserFactory.createUserWithParticipant()
UserFactory.createUserWithResearcher()

// Predefined test users
UserFactory.createTestUsers()
```

### **StudyFactory**

```javascript
// Basic study creation
StudyFactory.createStudy()

// Status-specific factories
StudyFactory.createDraftStudy()
StudyFactory.createPublishedStudy()
StudyFactory.createPausedStudy()
StudyFactory.createClosedStudy()

// Location-type factories
StudyFactory.createDigitalStudy()
StudyFactory.createInPersonStudy()
StudyFactory.createHybridStudy()
```

### **LocationFactory**

```javascript
// Basic location creation
LocationFactory.createLocation()

// Specific location types
LocationFactory.createUSLocation()
LocationFactory.createDigitalLocation()
```

## Usage Examples

### **Basic Usage**

```javascript
import { UserFactory, StudyFactory } from './factories/user-factory'

// Generate random user data
const userData = UserFactory.createUser()
console.log(userData)
// {
//   email: 'john.doe@example.com',
//   first_name: 'John',
//   last_name: 'Doe',
//   password: 'password123',
//   password_confirmation: 'password123'
// }

// Generate random study data
const studyData = StudyFactory.createStudy()
console.log(studyData)
// {
//   title: 'Comprehensive Research Study',
//   short_desc: 'A detailed study description',
//   methodologies: 'survey',
//   location_type: 'digital',
//   // ... more fields
// }
```

### **With Overrides**

```javascript
// Override specific fields
const user = UserFactory.createUser({
  email: 'specific@example.com',
  first_name: 'Jane',
  last_name: 'Smith',
})

const study = StudyFactory.createStudy({
  title: 'Custom Study Title',
  location_type: 'digital',
  methodologies: 'survey,interview',
})
```

### **In E2E Tests**

```javascript
test('user can sign up', async ({ page }) => {
  // Generate test data
  const userData = UserFactory.createUser()
  const participantData = UserFactory.createParticipant()

  // Use in form
  await page.goto('/signup')
  await page.fill('input[name="first_name"]', userData.first_name)
  await page.fill('input[name="last_name"]', userData.last_name)
  await page.fill('input[name="email"]', userData.email)
  await page.fill('input[name="password"]', userData.password)
  await page.fill(
    'input[name="password_confirmation"]',
    userData.password_confirmation
  )
  await page.click('button[type="submit"]')

  // Continue with role selection...
})
```

## Database Seeding

### **Programmatic Seeding**

```javascript
import { DatabaseSeeder } from './utils/database-seeder'

const seeder = new DatabaseSeeder()

// Seed predefined test data
await seeder.seedTestData()

// Create random test data
const randomData = await seeder.createRandomTestData(5)

// Clean up test data
await seeder.cleanupTestData()
```

### **Rails Console Seeding**

```javascript
import { RailsSeeder } from './utils/database-seeder'

// Seed via Rails console (faster)
await RailsSeeder.seedViaRailsConsole()
```

## Rails Integration

### **Test Controller**

The system includes a Rails controller for efficient test data management:

```ruby
# app/controllers/api/test_controller.rb
class Api::TestController < ApplicationController
  def seed
    # Creates test users, participants, researchers, and studies
  end

  def cleanup
    # Cleans up test data
  end
end
```

### **Routes**

```ruby
# config/routes.rb
scope :api do
  namespace :test, only: [:seed, :cleanup] do
    post '/seed', to: 'api/test#seed'
    post '/cleanup', to: 'api/test#cleanup'
  end
end
```

## ES6 Features Used

### **Classes**

```javascript
export class UserFactory {
  static createUser(overrides = {}) {
    return {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: 'password123',
      password_confirmation: 'password123',
      ...overrides,
    }
  }
}
```

### **Arrow Functions**

```javascript
const users = Array.from({ length: 5 }, () => UserFactory.createUser())
```

### **Destructuring**

```javascript
const { UserFactory, StudyFactory } = require('./factories/user-factory')
```

### **Spread Operator**

```javascript
return {
  ...user,
  participant,
}
```

### **Template Literals**

```javascript
throw new Error(`Failed to create user: ${response.statusText}`)
```

## Best Practices

### **1. Use Factories for Dynamic Data**

```javascript
// ✅ Good - Dynamic data
const userData = UserFactory.createUser()
await page.fill('input[name="email"]', userData.email)

// ❌ Bad - Hard-coded data
await page.fill('input[name="email"]', 'test@example.com')
```

### **2. Override Only What You Need**

```javascript
// ✅ Good - Minimal override
const user = UserFactory.createUser({ email: 'specific@example.com' })

// ❌ Bad - Overriding everything
const user = UserFactory.createUser({
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  // ... many more fields
})
```

### **3. Use Appropriate Factory Methods**

```javascript
// ✅ Good - Use specific factory
const study = StudyFactory.createDigitalStudy()

// ❌ Bad - Override location type
const study = StudyFactory.createStudy({ location_type: 'digital' })
```

### **4. Seed Data Before Tests**

```javascript
test.beforeAll(async () => {
  const seeder = new DatabaseSeeder()
  await seeder.seedTestData()
})
```

## Comparison with Rails Factory Bot

| Feature                | Rails Factory Bot                | E2E Factory System                |
| ---------------------- | -------------------------------- | --------------------------------- |
| **Data Generation**    | Faker gem                        | Faker.js                          |
| **Type Safety**        | Ruby types                       | ES6 objects                       |
| **Model Associations** | `belongs_to`, `has_many`         | Nested objects                    |
| **Traits**             | `trait :published`               | `createPublishedStudy()`          |
| **Sequences**          | `sequence(:email)`               | Faker.js sequences                |
| **Overrides**          | `create(:user, email: 'custom')` | `createUser({ email: 'custom' })` |

## Extending the System

### **Adding New Factories**

```javascript
export class ConnectionFactory {
  static createConnection(overrides = {}) {
    return {
      participant_id: faker.number.int({ min: 1, max: 100 }),
      study_id: faker.number.int({ min: 1, max: 100 }),
      status: faker.helpers.arrayElement(['active', 'pending', 'completed']),
      ...overrides,
    }
  }
}
```

### **Adding New Factory Methods**

```javascript
export class StudyFactory {
  // ... existing methods ...

  static createStudyWithParticipants(count = 3) {
    const study = this.createStudy()
    const participants = Array.from({ length: count }, () =>
      UserFactory.createParticipant()
    )
    return { study, participants }
  }
}
```

## Troubleshooting

### **Common Issues**

1. **Import/Export Errors**: Ensure you're using ES6 module syntax
2. **Faker.js Issues**: Update to latest version if data generation fails
3. **Rails Integration**: Ensure test controller is only available in test environment

### **Debugging**

```javascript
// Log generated data
const userData = UserFactory.createUser()
console.log('Generated user:', userData)

// Check factory output
const studyData = StudyFactory.createStudy()
console.log('Study data:', JSON.stringify(studyData, null, 2))
```

## File Structure

```
e2e/
├── factories/
│   └── user-factory.js       # Data factories (ES6)
├── utils/
│   ├── auth-helpers.js       # Authentication utilities
│   ├── test-data.js          # Test data constants
│   └── database-seeder.js    # Database seeding utilities
├── setup/
│   └── seed-test-data.js     # Test data setup
├── examples/
│   └── factory-usage.spec.js # Examples of using factories
├── auth.spec.js              # Authentication tests
├── participant-flow.spec.js   # Participant workflow tests
└── researcher-flow.spec.js    # Researcher workflow tests
```

## Next Steps

1. **Add more specialized factories** for complex scenarios
2. **Implement factory traits** for different user states
3. **Add validation** to ensure generated data is valid
4. **Create factory builders** for complex object graphs
5. **Add factory caching** for performance optimization
