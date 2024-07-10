import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormFeedback from "@/components/forms/FormFeedback";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError } from "zod";

import {
  addFeedback,
  editFeedback,
  deleteFeedback,
} from "@/services/actions/feedbackActions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/services/actions/feedbackActions", () => ({
  addFeedback: jest.fn(),
  editFeedback: jest.fn(),
  deleteFeedback: jest.fn(),
}));

describe("FormFeedback Component", () => {
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusArray = ["suggestion", "planned", "in-progress", "live"];
  const oldFeedback = {
    id: 1,
    title: "Old Feedback",
    description: "This is an old feedback",
    category: "UI",
    status: "suggestion",
    upvotes: 10,
    userId: 1,
    commentsCount: 2,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });
  });

  it("should render the form with initial values", () => {
    render(<FormFeedback />);
    expect(screen.getByLabelText(/Feedback Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Feedback Detail/i)).toBeInTheDocument();
  });

  it("should render the form with old feedback values", () => {
    render(<FormFeedback oldFeedback={oldFeedback} />);
    expect(screen.getByLabelText(/Feedback Title/i)).toHaveValue(
      oldFeedback.title,
    );
    expect(screen.getByLabelText(/Category/i)).toHaveTextContent(
      oldFeedback.category,
    );
    expect(screen.getByLabelText(/Feedback Detail/i)).toHaveValue(
      oldFeedback.description,
    );
    expect(screen.getByLabelText(/Update Status/i)).toHaveTextContent(
      oldFeedback.status,
    );
  });

  it("should display errors on form submission with invalid data", async () => {
    render(<FormFeedback />);
    fireEvent.click(screen.getByText(/Add Feedback/i));
    await waitFor(() => {
      expect(screen.getAllByText(/Can't be empty/i)).toHaveLength(2);
    });
  });

  it("should add feedback on valid form submission", async () => {
    (addFeedback as jest.Mock).mockResolvedValueOnce({});
    const { push } = useRouter();

    render(<FormFeedback />);
    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "New Feedback" },
    });
    fireEvent.change(screen.getByLabelText(/Feedback Detail/i), {
      target: { value: "This is a new feedback" },
    });
    fireEvent.click(screen.getByText(/Add Feedback/i));

    await waitFor(() => {
      expect(addFeedback).toHaveBeenCalledWith({
        title: "New Feedback",
        description: "This is a new feedback",
        category: categories[0],
        status: statusArray[0],
      });
      expect(toast.success).toHaveBeenCalledWith("Feedback added successfully");
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  it("should edit feedback on valid form submission", async () => {
    (editFeedback as jest.Mock).mockResolvedValueOnce({});
    const { refresh } = useRouter();

    render(<FormFeedback oldFeedback={oldFeedback} />);
    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "Updated Feedback" },
    });
    fireEvent.change(screen.getByLabelText(/Feedback Detail/i), {
      target: { value: "This is an updated feedback" },
    });
    fireEvent.click(screen.getByText(/Save Changes/i));

    await waitFor(() => {
      expect(editFeedback).toHaveBeenCalledWith({
        ...oldFeedback,
        title: "Updated Feedback",
        description: "This is an updated feedback",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Feedback edited successfully",
      );
      expect(refresh).toHaveBeenCalled();
    });
  });

  it("should delete feedback on delete button click", async () => {
    (deleteFeedback as jest.Mock).mockResolvedValueOnce({});
    const { push } = useRouter();

    render(<FormFeedback oldFeedback={oldFeedback} />);
    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(deleteFeedback).toHaveBeenCalledWith(oldFeedback.id);
      expect(toast.success).toHaveBeenCalledWith(
        "Feedback deleted successfully",
      );
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  it("should reset form on cancel button click", () => {
    render(<FormFeedback oldFeedback={oldFeedback} />);
    fireEvent.change(screen.getByLabelText(/Feedback Title/i), {
      target: { value: "Changed Title" },
    });
    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.getByLabelText(/Feedback Title/i)).toHaveValue(
      oldFeedback.title,
    );
  });
});
