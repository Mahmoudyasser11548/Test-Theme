import React from 'react'
import { useLayout } from './useLayout'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils'

describe('Render Correctly', () => { 
    test('Render with vertical', () => { 
        const {result} = renderHooksWithProviders(useLayout)
        const {layout} = result.current
        
        expect(layout).toBe('vertical')
    })

    test('Render with last Layout', () => { 
        const {result} = renderHooksWithProviders(useLayout)
        const {lastLayout} = result.current
        
        expect(lastLayout).toBe('vertical')
    })
})


describe('Render Correctly with Acting', () => { 
    test('Render with vertical', () => { 
        const {result} = renderHooksWithProviders(useLayout)
        const {layout, setLayout} = result.current
        act(() => setLayout('horizontal'))
        expect(layout).toBe('vertical')
    })

    test('Render with last Layout', () => { 
        const {result} = renderHooksWithProviders(useLayout)
        const {lastLayout, setLastLayout} = result.current
        act(() => setLastLayout('horizontal'))
        expect(lastLayout).toBe('vertical')
    })
})
