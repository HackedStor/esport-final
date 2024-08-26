import React, { ChangeEvent } from "react";

interface TextAreaProps {
  htmlFor: string;
  labelValue: string;
  TextAreaName: string;
  TextAreaId: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  htmlFor,
  labelValue,
  TextAreaName,
  TextAreaId,
  value,
  onChange,
}) => {
  return (
    <div className="form">
      <label htmlFor={htmlFor}>{labelValue} :</label>
      <textarea
        className="textarea"
        name={TextAreaName}
        id={TextAreaId}
        value={value}
        onChange={onChange}
        required
      ></textarea>
      <span className="input-border"></span>
    </div>
  );
};

export default TextArea;
