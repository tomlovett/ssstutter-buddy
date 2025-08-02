const OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

export async function seedTestData(baseUrl = 'http://localhost:3000') {
  await cleanupTestData(baseUrl)

  try {
    const response = await fetch(`${baseUrl}/test/seed`, OPTS)

    if (!response.ok) {
      console.log('⚠️ Seed response not ok')
      console.log('response:', response)
      throw new Error()
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Seed test data function failed')
    console.error('error:', error)
  }
}

export async function cleanupTestData(baseUrl = 'http://localhost:3000') {
  try {
    const response = await fetch(`${baseUrl}/test/cleanup`, OPTS)

    if (!response.ok) {
      console.log('⚠️ Cleanup response not ok')
      console.log('response:', response)
      throw new Error(`Cleanup response not ok: ${response}`)
    }
  } catch (error) {
    console.log('⚠️ Cleanup function failed')
    console.log('error:', error)
  }
}
