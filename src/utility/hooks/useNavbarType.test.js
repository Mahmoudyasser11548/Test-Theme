import React from 'react'
import { useNavbarType } from './useNavbarType'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils'

describe('Render Correctly', () => {
    test('Render Hook with Default Color', () => { 
        const {result} = renderHooksWithProviders(useNavbarType)
        const {navbarType} = result.current

        expect(navbarType).toBe('floating')
    })
    test('Render Hook with acting', () => { 
        const {result} = renderHooksWithProviders(useNavbarType)
        const {navbarType, setNavbarType} = result.current
        act(() => setNavbarType('hiddn'))
        expect(navbarType).toBe('floating')
    })
})