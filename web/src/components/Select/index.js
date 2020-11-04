import React from "react";
import "./styles.css";

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              label={option.label}
            ></option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
