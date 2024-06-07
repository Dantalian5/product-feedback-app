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
      <label htmlFor={htmlFor} className="text-sm font-bold text-dark-200">
        {label}
      </label>
      <p className="mb-4 text-sm font-normal text-dark-200">{description}</p>
      {children}
    </div>
  );
};

export default CustomLabel;
