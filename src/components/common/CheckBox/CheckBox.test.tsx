import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "./CheckBox";

describe("CheckBox component", () => {
  test("toggles checked state when is clicked", () => {
    render(<CheckBox label="Test" />);
    const checkbox = screen.getByLabelText("Test") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
  test("renders children correctly", () => {
    render(<CheckBox label="Test" />);
    const checkbox = screen.getByLabelText("Test") as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();
  });
  test("applies focus styles correctly", () => {
    render(<CheckBox label="Test" />);
    const checkbox = screen.getByLabelText("Test") as HTMLInputElement;
    const label = screen.getByText("Test");

    checkbox.focus();
    expect(checkbox).toHaveFocus();
    expect(label).toHaveClass("peer-focus:outline");
    expect(label).toHaveClass("peer-focus:outline-2");
    expect(label).toHaveClass("peer-focus:outline-blue-100");
  });
});
