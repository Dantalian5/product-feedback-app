import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddReply from "@/components/forms/AddReply/AddReply";
import { addComment } from "@/services/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

jest.mock("@/services/api", () => ({
  addComment: jest.fn(),
}));
jest.mock("react-hot-toast");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockAddComment = addComment as jest.Mock;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockUseRouter = useRouter as jest.Mock;

describe("AddReply Component", () => {
  const feedbackId = 1;
  const commentId = 1;
  const user = { id: 1, name: "Test User", username: "test_user", image: "" };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when user is logged in", () => {
    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);

    expect(
      screen.getByPlaceholderText(/Type your comment here/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Reply/i }),
    ).not.toBeDisabled();
  });

  test("displays error message when content is empty", async () => {
    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);

    fireEvent.submit(screen.getByRole("button", { name: /Post Reply/i }));

    await waitFor(() => {
      expect(screen.getByText(/Can't be empty/i)).toBeInTheDocument();
    });
  });

  test("calls addComment API on successful submission", async () => {
    mockAddComment.mockResolvedValue({});

    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test reply" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Reply/i }));

    await waitFor(() => {
      expect(mockAddComment).toHaveBeenCalledWith({
        feedbackId: feedbackId,
        content: "This is a test reply",
        parentId: commentId,
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Reply added successfully",
      );
    });
  });

  test("displays error toast on API failure", async () => {
    mockAddComment.mockRejectedValue(new Error("test error message"));

    render(<AddReply feedbackId={feedbackId} commentId={commentId} />);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test reply" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Reply/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("test error message");
    });
  });
});
