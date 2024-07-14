import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddComment from "@/components/forms/AddComment";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addComment } from "@/services/actions/commentActions";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/services/actions/commentActions", () => ({
  addComment: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("AddComment Component", () => {
  const feedbackId = 1;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render the form", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<AddComment feedbackId={feedbackId} />);
    expect(
      screen.getByPlaceholderText("Type your comment here"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post Comment/i }),
    ).toBeInTheDocument();
  });

  it("should display message when user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<AddComment feedbackId={feedbackId} />);
    expect(
      screen.getByText("You must be logged in to comment"),
    ).toBeInTheDocument();
  });

  it("should call addComment on form submit when user is logged in", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
    });
    (addComment as jest.Mock).mockResolvedValueOnce({});
    const { refresh } = useRouter();

    render(<AddComment feedbackId={feedbackId} />);
    fireEvent.change(screen.getByPlaceholderText("Type your comment here"), {
      target: { value: "Test comment" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(addComment).toHaveBeenCalledWith({
        feedbackId,
        parentId: null,
        content: "Test comment",
      });
      expect(toast.success).toHaveBeenCalledWith("Comment added successfully");
      expect(refresh).toHaveBeenCalled();
    });
  });

  it("should show error toast on submit failure", async () => {
    const errorMessage = "Failed to add comment";
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
    });
    (addComment as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<AddComment feedbackId={feedbackId} />);
    fireEvent.change(screen.getByPlaceholderText("Type your comment here"), {
      target: { value: "Test comment" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Post Comment/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Try again later",
      );
    });
  });
});
