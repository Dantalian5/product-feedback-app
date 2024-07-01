import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormFeedback from "@/components/forms/FormFeedback";
import { addFeedback, editFeedback, deleteFeedback } from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

jest.mock("@/services/api", () => ({
  addFeedback: jest.fn(),
  editFeedback: jest.fn(),
  deleteFeedback: jest.fn(),
}));
jest.mock("react-hot-toast");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockAddFeedback = addFeedback as jest.Mock;
const mockEditFeedback = editFeedback as jest.Mock;
const mockDeleteFeedback = deleteFeedback as jest.Mock;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockUseRouter = useRouter as jest.Mock;

const oldFeedback = {
  id: 1,
  title: "Old Title",
  category: "Feature",
  status: "suggestion",
  description: "Old description",
  upvotes: 0,
  user_id: 1,
};

describe("FormFeedback Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      refresh: jest.fn(),
      push: jest.fn(),
    });
  });

  test("renders correctly for creating new feedback", () => {
    render(<FormFeedback />);
    expect(screen.getByText("Create New Feedback")).toBeInTheDocument();
  });

  test("renders correctly for editing feedback", () => {
    render(<FormFeedback oldFeedback={oldFeedback} />);
    expect(
      screen.getByText(`Editing ‘${oldFeedback.title}’`),
    ).toBeInTheDocument();
  });

  test("handles form validation errors", async () => {
    render(<FormFeedback />);
    fireEvent.submit(screen.getByRole("button", { name: /Add Feedback/i }));

    await waitFor(() => {
      const errors = screen.getAllByText(/Can't be empty/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  test("calls addFeedback on form submit for new feedback", async () => {
    mockAddFeedback.mockResolvedValue({});
    render(<FormFeedback />);

    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "New Feedback Title" },
    });
    fireEvent.change(screen.getByLabelText(/Feedback Detail/i), {
      target: { value: "This is a new feedback description" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Add Feedback/i }));

    await waitFor(() => {
      expect(mockAddFeedback).toHaveBeenCalledWith({
        title: "New Feedback Title",
        category: "Feature",
        status: "suggestion",
        description: "This is a new feedback description",
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Feedback added successfully",
      );
      expect(mockUseRouter().refresh).toHaveBeenCalled();
    });
  });

  test("calls editFeedback on form submit for existing feedback", async () => {
    mockEditFeedback.mockResolvedValue({});
    render(<FormFeedback oldFeedback={oldFeedback} />);

    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "Edited Feedback Title" },
    });
    fireEvent.change(screen.getByLabelText(/Feedback Detail/i), {
      target: { value: "This is an edited feedback description" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Save Changes/i }));

    await waitFor(() => {
      expect(mockEditFeedback).toHaveBeenCalledWith({
        id: 1,
        title: "Edited Feedback Title",
        category: "Feature",
        status: "suggestion",
        description: "This is an edited feedback description",
        upvotes: 0,
        user_id: 1,
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Feedback edited successfully",
      );
      expect(mockUseRouter().refresh).toHaveBeenCalled();
    });
  });

  test("calls deleteFeedback on delete button click", async () => {
    mockDeleteFeedback.mockResolvedValue({});
    render(<FormFeedback oldFeedback={oldFeedback} />);

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(mockDeleteFeedback).toHaveBeenCalledWith(1);
      expect(mockToast.success).toHaveBeenCalledWith(
        "Feedback deleted successfully",
      );
      expect(mockUseRouter().push).toHaveBeenCalledWith("/");
    });
  });

  test("handles API errors gracefully", async () => {
    mockAddFeedback.mockRejectedValue(new Error("API error"));
    render(<FormFeedback />);

    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "New Feedback Title" },
    });
    fireEvent.change(screen.getByLabelText(/Feedback Detail/i), {
      target: { value: "This is a new feedback description" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Add Feedback/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("API error");
    });
  });
});
