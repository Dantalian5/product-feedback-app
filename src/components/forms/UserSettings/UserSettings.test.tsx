import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserSettings from "@/components/forms/UserSettings";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUserData } from "@/services/actions/userActions";
import type { User } from "@/types/global";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/services/actions/userActions", () => ({
  updateUserData: jest.fn(),
}));

describe("UserSettings Component", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  const mockUser: User & { email: string } = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    image: "",
  };

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
    render(<UserSettings user={mockUser} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Changes/i }),
    ).toBeInTheDocument();
  });

  it("should show success message and refresh on successful data update", async () => {
    (updateUserData as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(<UserSettings user={mockUser} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Updated" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "johnupdated" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johnupdated@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    await waitFor(() => {
      expect(updateUserData).toHaveBeenCalledWith({
        name: "John Updated",
        username: "johnupdated",
        email: "johnupdated@example.com",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "User data updated successfully",
      );
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("should show error message on update failure", async () => {
    (updateUserData as jest.Mock).mockRejectedValueOnce(
      new Error("Update failed"),
    );

    render(<UserSettings user={mockUser} />);
    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    await waitFor(() => {
      expect(updateUserData).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Try again later",
      );
    });
  });
});
