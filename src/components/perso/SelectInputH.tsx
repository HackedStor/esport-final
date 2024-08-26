import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputHProps {
  selectID: string;
  selectName: string;
  options: Option[];
}

const SelectInputH: React.FC<SelectInputHProps> = ({
  selectID,
  selectName,
  options,
}) => {
  return (
    <div className="form">
      <label htmlFor={selectID}>{selectName}:</label>
      <select
        id={selectID}
        className="input"
        name={selectID}
        required
        style={{ border: "1px solid rgba(221, 221, 221, 0.39)" }}
      >
        {options.map((option) => (
          <option className="option" value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputH;
