import React from "react";

const CheckBox = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <div className="checkbox">
        {props.options.map(option => {
          return (
            <div>
            <label key={option} className="checkbox">
              <input
                id={props.name}
                name={props.name}
                onChange={props.handleChange}
                value={option[0]}
                checked={props.selectedOptions.indexOf(option[0]) > -1}
                type="checkbox"
                className="checkbox-text"
              />
              {option[1]}
            </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBox;
