import { ChangeEvent } from 'react';

interface InputDateProps {
  htmlFor: string;
  labelValue: string;
  InputName: string;
  InputId: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputDate({ htmlFor, labelValue, InputName, InputId, value, onChange }: InputDateProps) {
  return (
    <div className="form">
      <label htmlFor={htmlFor}>{labelValue} :</label>
      <input
        className="input"
        type="date"
        name={InputName}
        id={InputId}
        value={value}
        onChange={onChange}
        required
      />
      <span className="input-border"></span>
    </div>
  );
}

export default InputDate;
