import React from 'react'
import { render, renderHook } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ThemeContext } from './src/utility/context/ThemeColors'
// As a basic setup, import your same slice reducers
import navbar from './src/redux/navbar'
import layout from './src/redux/layout'
import { BrowserRouter } from "react-router-dom";
const rootReducer = { navbar, layout };
export function renderWithProviders(
    ui,
    {
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { ...rootReducer } }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <BrowserRouter>
            <Provider store={store}>
                <ThemeContext>
                    {children}
                </ThemeContext>
            </Provider>
        </BrowserRouter>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
export function renderHooksWithProviders(
    ui,
    {
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { ...rootReducer } }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <BrowserRouter>
            <Provider store={store}>
                <ThemeContext>
                    {children}
                </ThemeContext>
            </Provider>
        </BrowserRouter>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...renderHook(ui, { wrapper: Wrapper, ...renderOptions }) }
}