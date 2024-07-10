import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UpVote from "@/components/common/UpVote";
import { upVoteFeedback } from "@/services/actions/feedbackActions";

jest.mock("react-hot-toast");
jest.mock("@/services/actions/feedbackActions", () => ({
  upVoteFeedback: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockToast = toast as jest.Mocked<typeof toast>;
const mockUpVoteFeedback = upVoteFeedback as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe("UpVote Component", () => {
  const feedbackId = 1;
  const defaultProps = {
    value: 10,
    feedbackId,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      refresh: jest.fn(),
    });
  });

  test("renders correctly with the given value", () => {
    render(<UpVote {...defaultProps} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByLabelText("upvote this feedback")).toBeInTheDocument();
  });

  test("calls upVoteFeedback and shows success message on upvote", async () => {
    mockUpVoteFeedback.mockResolvedValue({});

    render(<UpVote {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("upvote this feedback"));

    await waitFor(() => {
      expect(mockUpVoteFeedback).toHaveBeenCalledWith(feedbackId);
      expect(mockToast.success).toHaveBeenCalledWith("Feedback UpVoted!");
      expect(mockUseRouter().refresh).toHaveBeenCalled();
    });
  });

  test("shows error message when upVoteFeedback fails", async () => {
    mockUpVoteFeedback.mockRejectedValue(new Error("API error"));

    render(<UpVote {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("upvote this feedback"));

    await waitFor(() => {
      expect(mockUpVoteFeedback).toHaveBeenCalledWith(feedbackId);
      expect(mockToast.error).toHaveBeenCalledWith("API error");
    });
  });

  test("button displays correct styles when upvoted", async () => {
    mockUpVoteFeedback.mockResolvedValue({});

    const { rerender } = render(<UpVote {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("upvote this feedback"));

    await waitFor(() => {
      rerender(<UpVote {...defaultProps} />);
      expect(screen.getByRole("button")).toHaveClass("bg-blue-200 text-white");
    });
  });
});
