import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from "@/components/common/DropDown";

const options = ["Option 1", "Option 2", "Option 3"];
const defaultProps = {
  id: "dropdown-id",
  options,
  value: "Option 1",
  onChange: jest.fn(),
};

describe("DropDown Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with the given value", () => {
    render(<DropDown {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Select an option")).toBeInTheDocument();
  });

  test("opens and closes the options list when the button is clicked", () => {
    render(<DropDown {...defaultProps} />);

    const button = screen.getByLabelText("Select an option");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("calls onChange with the correct option when an option is clicked", () => {
    render(<DropDown {...defaultProps} />);

    const button = screen.getByLabelText("Select an option");
    fireEvent.click(button);

    const option = screen.getByRole("option", { name: /Option 2/i });
    fireEvent.click(option);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: "Option 2" },
    });
  });

  test("closes the options list when clicking outside of the component", () => {
    render(<DropDown {...defaultProps} />);

    const button = screen.getByLabelText("Select an option");
    fireEvent.click(button);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
