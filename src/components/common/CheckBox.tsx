import React from "react";
interface CheckProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  label: string;
}

const CheckBox = (props: CheckProps) => {
  const { label, checked } = props;
  const componentId = React.useId();
  return (
    <div className=" relative w-fit">
      <input
        id={componentId}
        name={componentId}
        type="checkbox"
        className="clip-[rect(0,0,0,0)] peer absolute m-[-1px] h-px w-px overflow-hidden border-0 opacity-0"
        checked={checked}
      />
      <label
        htmlFor={componentId}
        className=" text-13 rounded-10 cursor-pointer bg-gray-300 px-4 py-[6px] font-semibold text-blue-200 hover:bg-gray-500 peer-checked:bg-blue-200 peer-checked:text-white peer-focus:outline peer-focus:outline-2 peer-focus:outline-blue-100"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
