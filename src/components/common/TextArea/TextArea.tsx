import React from "react";

interface TextAreaProps extends React.ComponentPropsWithRef<"textarea"> {
  error: undefined | string;
}
const TextArea = (props: TextAreaProps) => {
  const { error, ...rest } = props;
  return (
    <div className="w-full">
      <textarea
        className={`${error && "border border-orange-200"} custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-orange-200">{error}</p>}
    </div>
  );
};

export default TextArea;
