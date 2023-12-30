import React from 'react'
import Error from './Error'
import { render, screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils';

describe('Error component', () => {
  test('error componenet should contain message passed', () => {
    // render(<Error/>)
    let message = "Validation Error";
    renderWithProviders(<Error message={message}/>)
    var errorText = screen.getByText(message);
    expect(errorText).toBeInTheDocument
  });
  test('error componenet should contain Page Not Found 🕵🏻‍♀️ if no message pass', () => {
    // render(<Error/>)
    renderWithProviders(<Error />)
    var errorText = screen.getByText(/Page Not Found 🕵🏻‍♀️/i);
    expect(errorText).toBeInTheDocument
  });

  test('Back to Home', async () => { 
    renderWithProviders(<Error />)
    const linkBack = screen.getByRole('link', {
      name: 'Back to home'
    })

    expect(linkBack).toBeInTheDocument
  })
})