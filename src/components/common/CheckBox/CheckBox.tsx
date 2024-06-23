import React, { SetStateAction } from "react";
interface CheckProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  label: string;
  filters: string[];
  setFilters: (filters: (prev: string[]) => string[]) => void;
}

const CheckBox = (props: CheckProps) => {
  const { label, setFilters, filters } = props;
  const componentId = React.useId();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filters.includes(label)) {
      setFilters((prev: string[]) => prev.filter((filter) => filter !== label));
    } else {
      setFilters((prev) => [...prev, label]);
    }
  };

  return (
    <div className=" relative w-fit">
      <input
        id={componentId}
        name={componentId}
        type="checkbox"
        className="clip-[rect(0,0,0,0)] peer absolute m-[-1px] h-px w-px overflow-hidden border-0 opacity-0"
        checked={filters.includes(label)}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={componentId}
        className="block w-fit cursor-pointer rounded-10 bg-dark-300 px-4 py-1.5 text-xs font-semibold text-blue-200 hover:bg-dark-500 peer-checked:bg-blue-200 peer-checked:text-white peer-focus:outline peer-focus:outline-2 peer-focus:outline-blue-100"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
