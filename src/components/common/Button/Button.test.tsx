import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} classe="blue">
        TestButton
      </Button>,
    );

    const button = screen.getByRole("button", { name: /testbutton/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders children correctly", () => {
    render(<Button classe="blue">TestButton</Button>);

    const button = screen.getByRole("button", { name: /testbutton/i });
    expect(button).toBeInTheDocument();
  });

  test("applies focus styles correctly", () => {
    render(<Button classe="blue">TestButton</Button>);

    const button = screen.getByRole("button", { name: /testbutton/i });
    button.focus();

    expect(button).toHaveFocus();
    expect(button).toHaveClass("custom-focus");
  });
});
