import React from "react";
import { render, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeContext } from "./src/utility/context/ThemeColors";
import IntlProviderWrapper from "./src/utility/context/IntlProviderWrapper";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "@store/rootReducer";

export function renderWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { ...rootReducer } }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext>
            <IntlProviderWrapper>{children}</IntlProviderWrapper>
          </ThemeContext>
        </Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
export function renderHooksWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { ...rootReducer } }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext>
            {" "}
            <IntlProviderWrapper>{children}</IntlProviderWrapper>
          </ThemeContext>
        </Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...renderHook(ui, { wrapper: Wrapper, ...renderOptions }) };
}
