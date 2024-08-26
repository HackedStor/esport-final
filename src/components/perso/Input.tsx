import { ChangeEvent } from "react";

interface InputProps {
  htmlFor: string;
  labelValue: string;
  InputName: string;
  InputId: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  accept?: string;
}

function CustomInput({
  htmlFor,
  labelValue,
  InputName,
  InputId,
  type,
  value,
  onChange,
  accept,
}: InputProps) {
  return (
    <div className="form">
      <label htmlFor={htmlFor}>{labelValue} :</label>
      <input
        className="input"
        type={type}
        name={InputName}
        id={InputId}
        value={value}
        onChange={onChange}
        accept={accept}
        required
      />
      <span className="input-border"></span>
    </div>
  );
}

export default CustomInput;
