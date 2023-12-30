import React from 'react'
import { useSkin } from './useSkin'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils'

describe('Render Hook Correctly', () => {
    test('render Hook with Light theme', () => { 
        const {result} = renderHooksWithProviders(useSkin)
        const {skin} = result.current

        expect(skin).toBe('light')
    })
    test('render Hook with Dark theme', () => { 
        const {result} = renderHooksWithProviders(useSkin)
        const {skin, setSkin} = result.current
        act(() => setSkin('dark'))
        expect(skin).toBe('light')
    })
})