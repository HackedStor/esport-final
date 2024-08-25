import * as React from "react"
import { Input } from "../../../ui/input"

export function ValoScoreOtherTeam() {
  const [value, setValue] = React.useState("")
  const [isValid, setIsValid] = React.useState(true)

  const validateScore = (score: string) => {
    // Regex to match a format like "13-5" or "7-13"
    const scorePattern = /^\d{1,2}-\d{1,2}$/
    return scorePattern.test(score)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    setIsValid(validateScore(inputValue))
  }

  return (
    <div>
      <Input
        placeholder="Scorre de l'autre équipe"
        value={value}
        onChange={handleChange}
        className={isValid ? "" : "border-red-500"}
        name="score"
      />
      {!isValid && (
        <p className="text-red-500 mt-2">Score invalide (e.g., 13-5).</p>
      )}
    </div>
  )
}
