import * as React from "react";
import { Input } from "../../../ui/input";

interface TmScoreProps {
  value: string;
  onChange: (value: string) => void;
}

export function TmScore({ value = "", onChange }: TmScoreProps) {
  const [isValid, setIsValid] = React.useState(true);

  const validateScore = (score: string) => {
    // Validation pour un score entier positif entre 0 et 99
    const scorePattern = /^([0-9]{1,2}:)?([0-5]?[0-9]:)?[0-5][0-9](\.[0-9]{1,3})?$/;
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
        placeholder="Temps de course"
        value={value}
        onChange={handleChange}
        className="GameInput"
        name="score"
        required
      />
      {!isValid && (
        <p className="text-red-500 mt-2">Temps invalide (e.g: 4:22).</p>
      )}
    </div>
  );
}
