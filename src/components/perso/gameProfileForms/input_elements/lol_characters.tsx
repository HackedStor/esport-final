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
  { name: "Aatrox", class: "Fighter" },
  { name: "Ahri", class: "Mage" },
  { name: "Akali", class: "Assassin" },
  { name: "Akshan", class: "Marksman" },
  { name: "Alistar", class: "Tank" },
  { name: "Amumu", class: "Tank" },
  { name: "Anivia", class: "Mage" },
  { name: "Annie", class: "Mage" },
  { name: "Aphelios", class: "Marksman" },
  { name: "Ashe", class: "Marksman" },
  { name: "Aurelion Sol", class: "Mage" },
  { name: "Azir", class: "Mage" },
  { name: "Bard", class: "Support" },
  { name: "Bel'Veth", class: "Fighter" },
  { name: "Blitzcrank", class: "Tank" },
  { name: "Brand", class: "Mage" },
  { name: "Braum", class: "Support" },
  { name: "Caitlyn", class: "Marksman" },
  { name: "Camille", class: "Fighter" },
  { name: "Cassiopeia", class: "Mage" },
  { name: "Cho'Gath", class: "Tank" },
  { name: "Corki", class: "Marksman" },
  { name: "Darius", class: "Fighter" },
  { name: "Diana", class: "Fighter" },
  { name: "Dr. Mundo", class: "Fighter" },
  { name: "Draven", class: "Marksman" },
  { name: "Ekko", class: "Assassin" },
  { name: "Elise", class: "Mage" },
  { name: "Evelynn", class: "Assassin" },
  { name: "Ezreal", class: "Marksman" },
  { name: "Fiddlesticks", class: "Mage" },
  { name: "Fiora", class: "Fighter" },
  { name: "Fizz", class: "Assassin" },
  { name: "Galio", class: "Tank" },
  { name: "Gangplank", class: "Fighter" },
  { name: "Garen", class: "Fighter" },
  { name: "Gnar", class: "Fighter" },
  { name: "Gragas", class: "Fighter" },
  { name: "Graves", class: "Marksman" },
  { name: "Gwen", class: "Fighter" },
  { name: "Hecarim", class: "Fighter" },
  { name: "Heimerdinger", class: "Mage" },
  { name: "Illaoi", class: "Fighter" },
  { name: "Irelia", class: "Fighter" },
  { name: "Ivern", class: "Support" },
  { name: "Janna", class: "Support" },
  { name: "Jarvan IV", class: "Tank" },
  { name: "Jax", class: "Fighter" },
  { name: "Jayce", class: "Fighter" },
  { name: "Jhin", class: "Marksman" },
  { name: "Jinx", class: "Marksman" },
  { name: "K'Sante", class: "Tank" },
  { name: "Kai'Sa", class: "Marksman" },
  { name: "Kalista", class: "Marksman" },
  { name: "Karma", class: "Mage" },
  { name: "Karthus", class: "Mage" },
  { name: "Kassadin", class: "Assassin" },
  { name: "Katarina", class: "Assassin" },
  { name: "Kayle", class: "Fighter" },
  { name: "Kayn", class: "Fighter" },
  { name: "Kennen", class: "Mage" },
  { name: "Kha'Zix", class: "Assassin" },
  { name: "Kindred", class: "Marksman" },
  { name: "Kled", class: "Fighter" },
  { name: "Kog'Maw", class: "Marksman" },
  { name: "LeBlanc", class: "Assassin" },
  { name: "Lee Sin", class: "Fighter" },
  { name: "Leona", class: "Tank" },
  { name: "Lillia", class: "Fighter" },
  { name: "Lissandra", class: "Mage" },
  { name: "Lucian", class: "Marksman" },
  { name: "Lulu", class: "Support" },
  { name: "Lux", class: "Mage" },
  { name: "Malphite", class: "Tank" },
  { name: "Malzahar", class: "Mage" },
  { name: "Maokai", class: "Tank" },
  { name: "Master Yi", class: "Assassin" },
  { name: "Milio", class: "Support" },
  { name: "Miss Fortune", class: "Marksman" },
  { name: "Mordekaiser", class: "Fighter" },
  { name: "Morgana", class: "Mage" },
  { name: "Nami", class: "Support" },
  { name: "Nasus", class: "Fighter" },
  { name: "Nautilus", class: "Tank" },
  { name: "Neeko", class: "Mage" },
  { name: "Nidalee", class: "Assassin" },
  { name: "Nilah", class: "Fighter" },
  { name: "Nocturne", class: "Assassin" },
  { name: "Nunu & Willump", class: "Tank" },
  { name: "Olaf", class: "Fighter" },
  { name: "Orianna", class: "Mage" },
  { name: "Ornn", class: "Tank" },
  { name: "Pantheon", class: "Fighter" },
  { name: "Poppy", class: "Tank" },
  { name: "Pyke", class: "Support" },
  { name: "Qiyana", class: "Assassin" },
  { name: "Quinn", class: "Marksman" },
  { name: "Rakan", class: "Support" },
  { name: "Rammus", class: "Tank" },
  { name: "Rek'Sai", class: "Fighter" },
  { name: "Rell", class: "Tank" },
  { name: "Renata Glasc", class: "Support" },
  { name: "Renekton", class: "Fighter" },
  { name: "Rengar", class: "Assassin" },
  { name: "Riven", class: "Fighter" },
  { name: "Rumble", class: "Fighter" },
  { name: "Ryze", class: "Mage" },
  { name: "Samira", class: "Marksman" },
  { name: "Sejuani", class: "Tank" },
  { name: "Senna", class: "Marksman" },
  { name: "Seraphine", class: "Mage" },
  { name: "Sett", class: "Fighter" },
  { name: "Shaco", class: "Assassin" },
  { name: "Shen", class: "Tank" },
  { name: "Shyvana", class: "Fighter" },
  { name: "Singed", class: "Tank" },
  { name: "Sion", class: "Tank" },
  { name: "Sivir", class: "Marksman" },
  { name: "Skarner", class: "Fighter" },
  { name: "Sona", class: "Support" },
  { name: "Soraka", class: "Support" },
  { name: "Swain", class: "Mage" },
  { name: "Sylas", class: "Mage" },
  { name: "Syndra", class: "Mage" },
  { name: "Tahm Kench", class: "Support" },
  { name: "Taliyah", class: "Mage" },
  { name: "Talon", class: "Assassin" },
  { name: "Taric", class: "Support" },
  { name: "Teemo", class: "Marksman" },
  { name: "Thresh", class: "Support" },
  { name: "Tristana", class: "Marksman" },
  { name: "Trundle", class: "Fighter" },
  { name: "Tryndamere", class: "Fighter" },
  { name: "Twisted Fate", class: "Mage" },
  { name: "Twitch", class: "Marksman" },
  { name: "Udyr", class: "Fighter" },
  { name: "Urgot", class: "Fighter" },
  { name: "Varus", class: "Marksman" },
  { name: "Vayne", class: "Marksman" },
  { name: "Veigar", class: "Mage" },
  { name: "Vel'Koz", class: "Mage" },
  { name: "Vex", class: "Mage" },
  { name: "Vi", class: "Fighter" },
  { name: "Viego", class: "Assassin" },
  { name: "Viktor", class: "Mage" },
  { name: "Vladimir", class: "Mage" },
  { name: "Volibear", class: "Fighter" },
  { name: "Warwick", class: "Fighter" },
  { name: "Wukong", class: "Fighter" },
  { name: "Xayah", class: "Marksman" },
  { name: "Xerath", class: "Mage" },
  { name: "Xin Zhao", class: "Fighter" },
  { name: "Yasuo", class: "Fighter" },
  { name: "Yone", class: "Assassin" },
  { name: "Yorick", class: "Fighter" },
  { name: "Yuumi", class: "Support" },
  { name: "Zac", class: "Tank" },
  { name: "Zed", class: "Assassin" },
  { name: "Zeri", class: "Marksman" },
  { name: "Ziggs", class: "Mage" },
  { name: "Zilean", class: "Support" },
  { name: "Zoe", class: "Mage" },
  { name: "Zyra", class: "Mage" },
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
