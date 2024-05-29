import React from "react";
import { nanoid } from "nanoid";
interface CheckProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  label: string;
}

const CheckBox = (props: CheckProps) => {
  const { label, ...rest } = props;
  const componentId = nanoid();
  return (
    <div>
        <input id={componentId} name={componentId} type="checkbox" {...rest} />
        <label for={componentId}>
      
      {label}
    </label>
    </div>
    
  );
};

export default CheckBox;
