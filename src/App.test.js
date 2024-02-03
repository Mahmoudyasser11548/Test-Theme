import React from "react";
import App from "./App";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";

describe("Menu Links", () => {
  it("links rendering correct", () => {
    renderWithProviders(<App />);

    expect(screen.getByText("Spin Wheel")).toBeInTheDocument();
  });
});
