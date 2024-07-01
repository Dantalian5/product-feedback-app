import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddComment from "@/components/forms/AddComment";
import { addComment } from "@/services/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserProvider from "@/components/context/UserProvider";

// Mock de las funciones y módulos utilizados
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

  const renderWithUserProvider = (ui: React.ReactElement, user: any = null) => {
    return render(<UserProvider user={user}>{ui}</UserProvider>);
  };

  test("renders correctly when user is logged in", () => {
    renderWithUserProvider(<AddComment feedbackId={feedbackId} />, user);

    expect(
      screen.getByLabelText(/Type your comment here/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type your comment here/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/250 Characters left/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Comment/i }),
    ).not.toBeDisabled();
  });

  test("renders correctly when user is not logged in", () => {
    renderWithUserProvider(<AddComment feedbackId={feedbackId} />);

    expect(
      screen.getByText(/You must be logged in to comment/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Comment/i }),
    ).toBeDisabled();
  });

  test("displays error message when content is empty", async () => {
    renderWithUserProvider(<AddComment feedbackId={feedbackId} />, user);

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
    });
  });

  test("calls addComment API on successful submission", async () => {
    mockAddComment.mockResolvedValue({});

    renderWithUserProvider(<AddComment feedbackId={feedbackId} />, user);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test comment" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(mockAddComment).toHaveBeenCalledWith({
        feedbackId: feedbackId,
        parentId: null,
        content: "This is a test comment",
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Comment added successfully",
      );
    });
  });

  test("displays error toast on API failure", async () => {
    mockAddComment.mockRejectedValue(new Error("API error"));

    renderWithUserProvider(<AddComment feedbackId={feedbackId} />, user);

    fireEvent.change(screen.getByPlaceholderText(/Type your comment here/i), {
      target: { value: "This is a test comment" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("API error");
    });
  });
});
