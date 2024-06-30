import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "@/components/common/CheckBox";

describe("CheckBox Component", () => {
  const label = "Test Label";
  let filters: string[] = [];
  const setFilters = jest.fn((updateFn: (prev: string[]) => string[]) => {
    filters = updateFn(filters);
  });

  afterEach(() => {
    jest.clearAllMocks();
    filters = [];
  });

  test("renders correctly", () => {
    render(
      <CheckBox label={label} filters={filters} setFilters={setFilters} />,
    );

    const checkbox = screen.getByRole("checkbox");
    const checkboxLabel = screen.getByLabelText(label);

    expect(checkbox).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
  });

  test("is checked when label is in filters", () => {
    filters = [label];
    render(
      <CheckBox label={label} filters={filters} setFilters={setFilters} />,
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  test("is not checked when label is not in filters", () => {
    render(
      <CheckBox label={label} filters={filters} setFilters={setFilters} />,
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  test("calls setFilters with correct value when checked", () => {
    render(
      <CheckBox label={label} filters={filters} setFilters={setFilters} />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(filters).toContain(label);
  });

  test("calls setFilters with correct value when unchecked", () => {
    filters = [label];
    render(
      <CheckBox label={label} filters={filters} setFilters={setFilters} />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(filters).not.toContain(label);
  });
});
