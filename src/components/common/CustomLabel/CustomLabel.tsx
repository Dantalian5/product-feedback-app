import React from "react";

interface CustomLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
  description: string;
}
const CustomLabel = (props: CustomLabelProps) => {
  const { children, htmlFor, label, description } = props;
  return (
    <div className="mb-6 w-full">
      <label htmlFor={htmlFor} className="text-dark-700 text-sm font-bold">
        {label}
      </label>
      <p className="text-dark-700 mb-4 text-sm font-normal">{description}</p>
      {children}
    </div>
  );
};

export default CustomLabel;
