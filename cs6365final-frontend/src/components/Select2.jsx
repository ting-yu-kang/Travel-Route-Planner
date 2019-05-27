import React from "react";

const Select2 = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}> {props.title} </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-control"
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option[0]} value={option[0]} label={option[1]}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select2;
