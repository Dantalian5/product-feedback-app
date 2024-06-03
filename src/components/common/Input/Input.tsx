"use client";
import React from "react";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  ID: string;
  placeholder: string;
}

const Input = (props: InputProps) => {
  const { ID, placeholder } = props;
  return (
    <input
      id={ID}
      placeholder={placeholder}
      type="text"
      className="custom-form-focus rounded-5 text-15 bg-gray-200 px-6 py-3 font-normal text-dark-200 placeholder:text-dark-200/60"
    />
  );
};

export default Input;
