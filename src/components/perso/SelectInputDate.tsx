import React, { ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputDateProps {
  selectID: string;
  selectName: string;
  options: Option[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInputDate: React.FC<SelectInputDateProps> = ({
  selectID,
  selectName,
  options,
  onChange,
}) => {
  return (
    <div className="form">
      <label htmlFor={selectID}>{selectName}:</label>
      <select
        id={selectID}
        className="input"
        name={selectID}
        required
        onChange={onChange}
        style={{ border: "1px solid rgba(221, 221, 221, 0.39)" }}
      >
        <option value="">Sélectionnez une date</option>
        {options.map((option) => (
          <option className="option" value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputDate;
