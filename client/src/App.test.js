import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
describe("App", () => {
  test("renders App component", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("logout-btn"));
    expect(getByTestId("login")).toBeInTheDocument();
  });
});
