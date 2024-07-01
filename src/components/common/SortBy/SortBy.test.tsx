import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortBy from "@/components/common/SortBy";

const options = [
  { value: "upvotes", label: "Upvotes" },
  { value: "comments", label: "Comments" },
];

const selectedOption = { value: "upvotes", label: "Upvotes" };
const handleChange = jest.fn();

describe("SortBy Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with the selected option", () => {
    render(
      <SortBy
        options={options}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />,
    );

    expect(screen.getByText(/Sort by :/i)).toBeInTheDocument();
    expect(screen.getByText(selectedOption.label)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sort by upvotes or comments/i }),
    ).toBeInTheDocument();
  });

  test("opens and closes the options list when the button is clicked", () => {
    render(
      <SortBy
        options={options}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />,
    );

    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("calls handleChange with the correct option when an option is clicked", () => {
    render(
      <SortBy
        options={options}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />,
    );

    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });
    fireEvent.click(button);

    const option = screen.getByRole("option", { name: /Comments/i });
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith({
      value: "comments",
      label: "Comments",
    });
  });

  test("closes the options list when clicking outside of the component", () => {
    render(
      <SortBy
        options={options}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />,
    );

    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });
    fireEvent.click(button);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
