import React from "react";

interface CustomLabelProps {
  children: React.ReactNode;
  label: string;
  description?: string;
}
const CustomLabel = (props: CustomLabelProps) => {
  const { children, label, description } = props;
  return (
    <label
      className="flex w-full flex-col text-sm font-bold text-dark-700"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {label}
      {description && <span className="font-normal">{description}</span>}
      <div className="mt-4 w-full">{children}</div>
    </label>
  );
};

export default CustomLabel;
