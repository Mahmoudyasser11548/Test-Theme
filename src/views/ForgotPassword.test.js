import React from 'react'
import ForgotPassword from './ForgotPassword'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import userEvent from '@testing-library/user-event'

describe('Render Correctly', () => { 
    test('Test link', async() => {
        renderWithProviders(<ForgotPassword />)
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        const textInput = screen.getByRole('textbox')
        expect(textInput).toBeInTheDocument
        await userEvent.type(textInput, "mahmoud@gmail.com")
        expect(textInput.value).toMatch(reg)


        const buttonReset = screen.getByRole('button', {
            name: 'Send reset link'
        })
        expect(buttonReset).toBeInTheDocument
        
        const backToLogin = screen.getByRole('link', {
            name: 'Back to login'
        })
        expect(backToLogin).toBeInTheDocument
        expect(backToLogin.href).toContain('/login')
    })
})