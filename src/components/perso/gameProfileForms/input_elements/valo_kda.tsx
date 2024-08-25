import * as React from "react";
import { Input } from "../../../ui/input";

export function ValoKDA() {
  const [value, setValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  const validateKDA = (kda: string) => {
    // Simple regex to match a format like "10/5/8"
    const kdaPattern = /^\d+\/\d+\/\d+$/;
    return kdaPattern.test(kda);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setIsValid(validateKDA(inputValue));
  };

  return (
    <div>
      <Input
        placeholder="K/D/A"
        value={value}
        onChange={handleChange}
        className={isValid ? "" : "border-red-500"}
        name="kda"
      />
      {!isValid && (
        <p className="text-red-500 mt-2">
          KDA invalide (e.g., 10/5/8).
        </p>
      )}
    </div>
  );
}
