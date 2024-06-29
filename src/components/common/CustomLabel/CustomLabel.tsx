import React from "react";

interface CustomLabelProps {
  children: React.ReactNode;
  label: string;
  description?: string;
  htmlFor: string;
  error?: string;
}
const CustomLabel = ({
  children,
  label,
  description,
  htmlFor,
  error,
}: CustomLabelProps) => {
  return (
    <div className="w-full">
      <label
        className="mb-4 flex w-full flex-col text-sm font-bold text-dark-700"
        htmlFor={htmlFor}
      >
        {label}
        {description && <span className="font-normal">{description}</span>}
      </label>
      <div
        className={`${error && "border border-orange-200"} w-full rounded-5`}
      >
        {children}
      </div>
      {error && <p className="mt-1 text-sm text-orange-200">{error}</p>}
    </div>
  );
};

export default CustomLabel;
