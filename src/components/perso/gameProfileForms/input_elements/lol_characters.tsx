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
import ChampionsAPI from "./retrieve_lol_champ";

interface LolChampionsProps {
  onChampionChange: (champ: { name: string; class: string }) => void;
}

const champion = ChampionsAPI();

export function LolChampions({ onChampionChange }: LolChampionsProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState<{
    name: string;
    class: string;
  } | null>(null);

  const handleSelectChampion = (agent: { name: string; class: string }) => {
    setSelectedAgent(agent);
    onChampionChange(agent); // Remonte la valeur au parent
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a champion"
          className="w-[200px] justify-between"
        >
          {selectedAgent ? selectedAgent.name : "Choisissez un champion..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Trouvez un agent..." />
          <CommandList>
            <CommandEmpty>Aucun champion trouvé.</CommandEmpty>
            <CommandGroup>
              {champion.map((champion) => (
                <CommandItem
                  key={champion.name}
                  onSelect={() => handleSelectChampion(champion)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAgent?.name === champion.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {champion.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}