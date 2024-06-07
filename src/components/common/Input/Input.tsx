"use client";
import React from "react";

interface InputProps extends React.ComponentPropsWithRef<"textarea"> {
  id: string;
  placeholder: string;
  isError?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input = (props: InputProps) => {
  const { id, placeholder, className, onChange, isError, value, ...rest } =
    props;
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`custom-form-focus block w-full rounded-5 bg-gray-200 px-6 py-3 text-15 font-normal text-dark-200 placeholder:text-dark-200/60 ${
        isError ? "border border-orange-200" : ""
      }`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};
