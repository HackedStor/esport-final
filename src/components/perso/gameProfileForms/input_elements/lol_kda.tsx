import * as React from "react";
import { Input } from "../../../ui/input";
import "../../../../assets/css/Dashboard.css"

interface LolKDAProps {
  value: string;
  onChange: (value: string) => void;
}

export function LolKDA({ value = "", onChange }: LolKDAProps) {
  const [isValid, setIsValid] = React.useState(true);

  const validateKDA = (kda: string) => {
    const kdaPattern = /^\d+\/\d+\/\d+$/;
    return kdaPattern.test(kda);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setIsValid(validateKDA(inputValue));
    onChange(inputValue); // Appel de la fonction onChange pour mettre à jour l'état parent
  };

  return (
    <div>
      <Input
        placeholder="K/D/A"
        value={value}
        onChange={handleChange}
        className="GameInput"
        name="kda"
        required
      />
      {!isValid && (
        <p className="text-red-500 mt-2">KDA invalide (e.g., 10/5/8).</p>
      )}
    </div>
  );
}
