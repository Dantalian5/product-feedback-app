import React from "react";

interface TextAreaProps extends React.ComponentPropsWithRef<"textarea"> {}
const TextArea = ({ ...rest }: TextAreaProps) => {
  return (
    <textarea
      className={`custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md`}
      {...rest}
    />
  );
};

export default TextArea;
