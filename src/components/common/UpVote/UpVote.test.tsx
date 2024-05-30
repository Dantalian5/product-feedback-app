import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpVote from "./UpVote";

describe("UpVote component", () => {
  test("test focus & accesibility", () => {
    render(<UpVote />);
    const button = screen.getByRole("button", {
      name: /upvote this feedback/i,
    });
    expect(button).toBeInTheDocument();
    button.focus();
    expect(button).toHaveFocus();
    expect(button).toHaveClass("custom-focus");
  });
});
