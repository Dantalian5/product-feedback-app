import React from "react";
import SortBy from "./SortBy";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("SortBy component", () => {
  test("render correctly", () => {
    render(<SortBy />);
    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });

    expect(button).toBeInTheDocument();
  });
  test("opens menu on click", async () => {
    render(<SortBy />);
    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });
    fireEvent.click(button);
    const menu = await screen.getByRole("listbox");
    expect(menu).toBeInTheDocument();
    const menuItems = await screen.getAllByRole("option");
    expect(menuItems).toHaveLength(4);
  });
  test("options behavior", async () => {
    render(<SortBy />);
    const button = screen.getByRole("button", {
      name: /Sort by upvotes or comments/i,
    });
    fireEvent.click(button);
    const menu = await screen.getByRole("listbox");
    const option = await screen.getByRole("option", {
      name: /Least Comments/i,
    });
    fireEvent.click(option);

    expect(menu).not.toBeInTheDocument();
    expect(button).toHaveTextContent("Sort by : Least Comments");
  });
});
