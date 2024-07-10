import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "@/components/forms/RegisterForm";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { addUserToDb } from "@/services/actions/userActions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/services/actions/userActions", () => ({
  addUserToDb: jest.fn(),
}));

describe("RegisterForm Component", () => {
  const mockPush = jest.fn();
  const mockUseSearchParams = {
    get: jest.fn().mockReturnValue("/"),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i }),
    ).toBeInTheDocument();
  });

  it("should show success message and redirect on successful registration", async () => {
    (addUserToDb as jest.Mock).mockResolvedValueOnce({ status: 201 });

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(addUserToDb).toHaveBeenCalledWith({
        name: "John Doe",
        username: "john_doe",
        email: "test@example.com",
        password: "password",
        confirmPassword: "password",
      });
      expect(toast.success).toHaveBeenCalledWith("User created successfully");
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should show error message on invalid registration", async () => {
    (addUserToDb as jest.Mock).mockResolvedValueOnce({
      status: 400,
      errorList: [{ path: ["email"], message: "Invalid email" }],
    });

    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));
    await waitFor(() => {
      expect(addUserToDb).toHaveBeenCalledWith({
        name: "John Doe",
        username: "john_doe",
        email: "invalid-email",
        password: "password",
        confirmPassword: "password",
      });
      expect(toast.error).toHaveBeenCalledWith(
        "Please fill in all the fields correctly",
      );
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });
  it("should show error message on existing user", async () => {
    (addUserToDb as jest.Mock).mockResolvedValueOnce({ status: 409 });
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(addUserToDb).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
        }),
      );
      expect(toast.error).toHaveBeenCalledWith(
        "User with that email already exists",
      );
      expect(
        screen.getByText("User with that email already exists"),
      ).toBeInTheDocument();
    });
  });

  it("should show error message on server error", async () => {
    (addUserToDb as jest.Mock).mockResolvedValueOnce({ status: 500 });
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(addUserToDb).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Internal server error. Please try again later",
      );
    });
  });

  it("should show error message on unknown error", async () => {
    (addUserToDb as jest.Mock).mockResolvedValueOnce({ status: 999 });
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(addUserToDb).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Oops, something went wrong. Try again later",
      );
    });
  });
});
