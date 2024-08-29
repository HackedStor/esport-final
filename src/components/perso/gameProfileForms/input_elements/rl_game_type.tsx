"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { cn } from "../../../../lib/utils";

interface RlModesProps {
  onModeChange: (map: { name: string }) => void;
}

const modes = [
    { name: "1v1 Duel" },
    { name: "2v2 Doubles" },
    { name: "3v3 Standard" },
    { name: "4v4 Chaos" },
    { name: "Snow Day" },
    { name: "Hoops" },
    { name: "Rumble" },
    { name: "Dropshot" },
    { name: "Heatseeker" },
    { name: "Spike Rush" },
    { name: "2v2 Tournaments" },
    { name: "3v3 Tournaments" },
    { name: "Extra Modes Tournaments" }
];

  
export function RlModes({ onModeChange: onModeChange }: RlModesProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMode, setSelectedMode] = React.useState<{
    name: string;
  } | null>(null);

  const handleSelectMode = (mode: { name: string }) => {
    setSelectedMode(mode);
    onModeChange(mode); // Remonte la valeur au parent
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between TableModal"
        >
          {selectedMode ? selectedMode.name : "Mode de jeu..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Trouvez un mode..." />
          <CommandList>
            <CommandEmpty>Aucun mode trouvé.</CommandEmpty>
            <CommandGroup>
              {modes.map((modes) => (
                <CommandItem
                  key={modes.name}
                  onSelect={() => handleSelectMode(modes)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMode?.name === modes.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {modes.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
