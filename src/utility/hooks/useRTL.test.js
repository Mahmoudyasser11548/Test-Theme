import React from 'react'
import { useRTL } from './useRTL'
import { act } from '@testing-library/react'
import { renderHooksWithProviders } from '../../../test-utils';

describe('UseRTL', () => {
  test('error componenet should contain message passed', () => {
    // // render(<Error/>)
    const { result } = renderHooksWithProviders(useRTL)
    const [isRtl] = result.current
    expect(isRtl).toBe(false)
  });
  test('error componenet should contain message passed1', () => {
    // // render(<Error/>)
    const { result } = renderHooksWithProviders(useRTL)
    const [isRtl, setValue] = result.current
    act(() => setValue(true))
    expect(isRtl).toBe(false)
  });

})