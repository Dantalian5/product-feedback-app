import React from "react";

interface InputProps extends React.ComponentPropsWithRef<"input"> {}
const Input = ({ ...rest }: InputProps) => {
  return (
    <input
      className={`custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md`}
      {...rest}
    />
  );
};

export default Input;
