import * as React from "react";
import { Input } from "../../../ui/input";

interface SmashScoreProps {
  value: string;
  onChange: (value: string) => void;
}

export function SmashScore({ value = "", onChange }: SmashScoreProps) {
  const [isValid, setIsValid] = React.useState(true);

  const validateScore = (score: string) => {
    // Validation pour un score entier positif entre 0 et 16
    const scorePattern = /^(1[0-6]|[1-9])$/;
    return scorePattern.test(score);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setIsValid(validateScore(inputValue));
    onChange(inputValue); // Met à jour la valeur dans le parent
  };

  return (
    <div className="w-[15vw]">
      <Input
        placeholder="Ton placement"
        value={value}
        onChange={handleChange}
        className="GameInput"
        name="score"
        required
      />
      {!isValid && (
        <p className="text-red-500 mt-2">Placement invalide (0 à 16).</p>
      )}
    </div>
  );
}
