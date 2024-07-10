import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPassword from "@/components/forms/UserPassword";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUserPassword } from "@/services/actions/userActions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/services/actions/userActions", () => ({
  updateUserPassword: jest.fn(),
}));

describe("UserPassword Component", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<UserPassword />);
    expect(screen.getByLabelText("Old Password")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Change Password/i }),
    ).toBeInTheDocument();
  });

  it("should show success message and refresh on successful password update", async () => {
    (updateUserPassword as jest.Mock).mockResolvedValueOnce({ status: 201 });

    render(<UserPassword />);
    fireEvent.change(screen.getByLabelText("Old Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: "oldpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
      expect(toast.success).toHaveBeenCalledWith("Password Updated");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("should show error message on incorrect password", async () => {
    (updateUserPassword as jest.Mock).mockResolvedValueOnce({ status: 401 });

    render(<UserPassword />);
    fireEvent.change(screen.getByLabelText("Old Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: "wrongpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
      expect(toast.error).toHaveBeenCalledWith("Incorrect password");
    });
  });

  it("should show error message on user not found", async () => {
    (updateUserPassword as jest.Mock).mockResolvedValueOnce({ status: 404 });

    render(<UserPassword />);
    fireEvent.change(screen.getByLabelText("Old Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: "oldpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
      expect(toast.error).toHaveBeenCalledWith("User not found");
    });
  });

  it("should show error message on server error", async () => {
    (updateUserPassword as jest.Mock).mockResolvedValueOnce({ status: 500 });

    render(<UserPassword />);
    fireEvent.change(screen.getByLabelText("Old Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: "oldpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
      expect(toast.error).toHaveBeenCalledWith(
        "Internal server error. Please try again later",
      );
    });
  });

  it("should show error message on unknown error", async () => {
    (updateUserPassword as jest.Mock).mockResolvedValueOnce({ status: 999 });
    render(<UserPassword />);
    fireEvent.change(screen.getByLabelText("Old Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: "oldpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
      expect(toast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Please, try again later",
      );
    });
  });
});
