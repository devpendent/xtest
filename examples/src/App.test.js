import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

it('renders counter functionality correctly', () => {
  const { getByLabelText, getByText } = render(<App />)

  expect(getByText('Count: 0')).toBeVisible()

  fireEvent.click(getByLabelText('increment'))
  expect(getByText('Count: 1')).toBeVisible()

  fireEvent.click(getByLabelText('decrement'))
  expect(getByText('Count: 0')).toBeVisible()
})
