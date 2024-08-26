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

interface ValoAgentsProps {
  onAgentChange: (agent: { name: string; class: string }) => void;
}

const agents = [
  { name: "Brimstone", class: "controleur" },
  { name: "Phoenix", class: "duelliste" },
  { name: "Sage", class: "sentinelle" },
  { name: "Sova", class: "initiateur" },
  { name: "Viper", class: "controleur" },
  { name: "Cypher", class: "sentinelle" },
  { name: "Reyna", class: "duelliste" },
  { name: "Killjoy", class: "sentinelle" },
  { name: "Breach", class: "initiateur" },
  { name: "Omen", class: "controleur" },
  { name: "Jett", class: "duelliste" },
  { name: "Raze", class: "duelliste" },
  { name: "Skye", class: "initiateur" },
  { name: "Yoru", class: "duelliste" },
  { name: "Astra", class: "controleur" },
  { name: "KAY/O", class: "initiateur" },
  { name: "Chamber", class: "sentinelle" },
  { name: "Neon", class: "duelliste" },
  { name: "Fade", class: "initiateur" },
  { name: "Harbor", class: "controleur" },
  { name: "Gekko", class: "initiateur" },
  { name: "Deadlock", class: "sentinelle" },
  { name: "Iso", class: "duelliste" },
  { name: "Clove", class: "controlleur" },
];

export function ValoAgents({ onAgentChange }: ValoAgentsProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState<{
    name: string;
    class: string;
  } | null>(null);

  const handleSelectAgent = (agent: { name: string; class: string }) => {
    setSelectedAgent(agent);
    onAgentChange(agent); // Remonte la valeur au parent
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedAgent ? selectedAgent.name : "Choisissez un agent..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Trouvez un agent..." />
          <CommandList>
            <CommandEmpty>Aucun agent trouvé.</CommandEmpty>
            <CommandGroup>
              {agents.map((agent) => (
                <CommandItem
                  key={agent.name}
                  onSelect={() => handleSelectAgent(agent)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAgent?.name === agent.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {agent.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
