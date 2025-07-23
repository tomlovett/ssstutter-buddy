describe('Jest Setup', () => {
  test('should be able to run tests', () => {
    expect(true).toBe(true)
  })

  test('should have testing-library matchers available', () => {
    const element = document.createElement('div')
    element.textContent = 'Hello World'
    document.body.appendChild(element)

    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Hello World')
  })
})
