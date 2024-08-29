import * as React from "react";
import { Input } from "../../../ui/input";

interface RlScoreProps {
  value: string;
  onChange: (value: string) => void;
}

export function RlScore({ value = "", onChange }: RlScoreProps) {
  const [isValid, setIsValid] = React.useState(true);

  const validateScore = (score: string) => {
    // Validation pour un score entier positif entre 0 et 99
    const scorePattern = /^\d{1,2}$/;
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
        placeholder="Score de ton équipe"
        value={value}
        onChange={handleChange}
        className="GameInput"
        name="score"
        required
      />
      {!isValid && (
        <p className="text-red-500 mt-2">Score invalide (0 à 99).</p>
      )}
    </div>
  );
}
