import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddComment from "@/components/forms/AddComment/AddComment";
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

describe("AddComment Component", () => {
  const feedbackId = 1;
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
    render(<AddComment feedbackId={feedbackId} user={user} />);

    expect(screen.getByLabelText(/Add Comment/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type your comment here/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Comment/i }),
    ).not.toBeDisabled();
  });

  test("renders correctly when user is not logged in", () => {
    render(<AddComment feedbackId={feedbackId} user={null} />);

    expect(
      screen.getByText(/You must be logged in to comment/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Comment/i }),
    ).toBeDisabled();
  });

  test("displays error message when content is empty", async () => {
    render(<AddComment feedbackId={feedbackId} user={user} />);

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(screen.getByText(/Can't be empty/i)).toBeInTheDocument();
    });
  });

  test("calls addComment API on successful submission", async () => {
    mockAddComment.mockResolvedValue({});

    render(<AddComment feedbackId={feedbackId} user={user} />);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test comment" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(mockAddComment).toHaveBeenCalledWith({
        id: 0,
        feedback_id: feedbackId,
        content: "This is a test comment",
        user: user.id,
        replying_to: null,
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Comment added successfully",
      );
    });
  });

  test("displays error toast on API failure", async () => {
    mockAddComment.mockRejectedValue(new Error("API error"));

    render(<AddComment feedbackId={feedbackId} user={user} />);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test comment" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Try again later",
      );
    });
  });
});
