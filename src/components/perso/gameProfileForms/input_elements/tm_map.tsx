import * as React from "react";
import { Input } from "../../../ui/input";

interface TmMapProps {
  value: string;
  onChange: (value: string) => void;
}

export function TmMap({ value = "", onChange }: TmMapProps) {


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue); // Met à jour la valeur dans le parent
  };

  return (
    <div className="w-[15vw]">
      <Input
        placeholder="Circuit"
        value={value}
        onChange={handleChange}
        className="GameInput"
        name="score"
        required
      />
    </div>
  );
}
