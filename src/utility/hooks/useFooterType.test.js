import React from 'react'
import { useFooterType } from './useFooterType'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils'

describe('Render Correctly', () => { 
    test('Render with Static', () => { 
        const {result} = renderHooksWithProviders(useFooterType)
        const {footerType} = result.current
        
        expect(footerType).toBe('static')
    })
    test('Render with acting Dynamic', () => { 
        const {result} = renderHooksWithProviders(useFooterType)
        const {setFooterType, footerType} = result.current
        act(() => setFooterType('sticky'))
        expect(footerType).toBe('static')
    })
})