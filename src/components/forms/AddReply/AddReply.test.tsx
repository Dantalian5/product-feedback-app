import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddReply from "@/components/forms/AddReply";
import { useRouter } from "next/navigation";
import { addComment } from "@/services/actions/commentActions";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/actions/commentActions", () => ({
  addComment: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("AddReply Component", () => {
  const feedbackId = 1;
  const commentId = 1;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render the form", () => {
    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);
    expect(
      screen.getByPlaceholderText("Type your comment here"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Reply/i }),
    ).toBeInTheDocument();
  });

  it("should display error when submitting empty form", async () => {
    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);
    fireEvent.click(screen.getByRole("button", { name: /Post Reply/i }));
    await waitFor(() => {
      expect(screen.getByText("Can't be empty")).toBeInTheDocument();
    });
  });

  it("should call addComment on form submit", async () => {
    (addComment as jest.Mock).mockResolvedValueOnce({});
    const { refresh } = useRouter();

    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);
    fireEvent.change(screen.getByPlaceholderText("Type your comment here"), {
      target: { value: "Test comment" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Post Reply/i }));

    await waitFor(() => {
      expect(addComment).toHaveBeenCalledWith({
        feedbackId,
        parentId: commentId,
        content: "Test comment",
      });
      expect(toast.success).toHaveBeenCalledWith("Reply added successfully");
      expect(refresh).toHaveBeenCalled();
    });
  });

  it("should show error toast on submit failure", async () => {
    const errorMessage = "Failed to add comment";
    (addComment as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);
    fireEvent.change(screen.getByPlaceholderText("Type your comment here"), {
      target: { value: "Test comment" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Post Reply/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Try again later",
      );
    });
  });
});
