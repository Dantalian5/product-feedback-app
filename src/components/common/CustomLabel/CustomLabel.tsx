import React from "react";

interface CustomLabelProps {
  children: React.ReactNode;
  label: string;
  description?: string;
  htmlFor: string;
}
const CustomLabel = (props: CustomLabelProps) => {
  const { children, label, description, htmlFor } = props;
  return (
    <div className="w-full">
      <label
        className="text-dark-700, mb-4 flex w-full flex-col text-sm font-bold"
        htmlFor={htmlFor}
      >
        {label}
        {description && <span className="font-normal">{description}</span>}
      </label>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default CustomLabel;
