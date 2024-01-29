/* eslint-disable no-unused-expressions */
import React from "react";
import { renderWithProviders } from "../../../test-utils";
import { screen } from "@testing-library/react";
import List from "./List";

describe("Sample Component", () => {
  it("Render Correctly", () => {
    renderWithProviders(<List />);
    expect(screen.getByText(/list/i)).toBeInTheDocument;
  });
});
