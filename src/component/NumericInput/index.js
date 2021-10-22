import { Input } from "antd";
import React from "react";

const NumericInputDemo = (props) => {
  const onChange = (e) => {
    const { value, name } = e.target;
    const reg = /^-?\d*(\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      props.onChange({
        target: {
          name: name,
          value: value,
        },
      });
    }
  };
  return <Input {...props} onChange={onChange} />;
};

const NumericInput = (props) => {
  return <NumericInputDemo {...props} onChange={props.onChange} />;
};

export default NumericInput;
