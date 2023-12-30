import React from 'react'
import { useNavbarColor } from './useNavbarColor'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils'

describe('Render Correctly', () => {
    test('Render Hook with Default Color', () => { 
        const {result} = renderHooksWithProviders(useNavbarColor)
        const {navbarColor} = result.current

        expect(navbarColor).toBe('white')
    })
    test('Render Hook with acting', () => { 
        const {result} = renderHooksWithProviders(useNavbarColor)
        const {navbarColor, setNavbarColor} = result.current
        act(() => setNavbarColor('black'))
        expect(navbarColor).toBe('white')
    })
})