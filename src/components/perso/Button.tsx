// Button.tsx
import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  classValue: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, classValue, text, onClick }) => {
  return (
    <div className="submit_control">
      <button type={type} className={classValue} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
