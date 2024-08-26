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

interface LolChampionsProps {
  onChampionChange: (champ: { name: string; role: string }) => void;
}

const champion = [
  { name: "Aatrox", tags: ["Fighter"], role: "Fighter" },
  { name: "Ahri", tags: ["Mage", "Assassin"], role: "Mage" },
  { name: "Akali", tags: ["Assassin"], role: "Assassin" },
  { name: "Akshan", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Alistar", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Amumu", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Anivia", tags: ["Mage"], role: "Mage" },
  { name: "Annie", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Aphelios", tags: ["Marksman"], role: "Marksman" },
  { name: "Ashe", tags: ["Marksman", "Support"], role: "Marksman" },
  { name: "Aurelion Sol", tags: ["Mage"], role: "Mage" },
  { name: "Aurora", tags: ["Mage", "Assassin"], role: "Mage" },
  { name: "Azir", tags: ["Mage", "Marksman"], role: "Mage" },
  { name: "Bard", tags: ["Support", "Mage"], role: "Support" },
  { name: "Bel'Veth", tags: ["Fighter"], role: "Fighter" },
  { name: "Blitzcrank", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Brand", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Braum", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Briar", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Caitlyn", tags: ["Marksman"], role: "Marksman" },
  { name: "Camille", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Cassiopeia", tags: ["Mage"], role: "Mage" },
  { name: "Cho'Gath", tags: ["Tank", "Mage"], role: "Tank" },
  { name: "Corki", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Darius", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Diana", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Draven", tags: ["Marksman"], role: "Marksman" },
  { name: "Dr. Mundo", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "Ekko", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Elise", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Evelynn", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Ezreal", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Fiddlesticks", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Fiora", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Fizz", tags: ["Assassin", "Fighter"], role: "Assassin" },
  { name: "Galio", tags: ["Tank", "Mage"], role: "Tank" },
  { name: "Gangplank", tags: ["Fighter"], role: "Fighter" },
  { name: "Garen", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Gnar", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Gragas", tags: ["Fighter", "Mage"], role: "Fighter" },
  { name: "Graves", tags: ["Marksman"], role: "Marksman" },
  { name: "Gwen", tags: ["Fighter"], role: "Fighter" },
  { name: "Hecarim", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Heimerdinger", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Hwei", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Illaoi", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Irelia", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Ivern", tags: ["Support", "Mage"], role: "Support" },
  { name: "Janna", tags: ["Support", "Mage"], role: "Support" },
  { name: "Jarvan IV", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Jax", tags: ["Fighter"], role: "Fighter" },
  { name: "Jayce", tags: ["Marksman", "Fighter"], role: "Marksman" },
  { name: "Jhin", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Jinx", tags: ["Marksman"], role: "Marksman" },
  { name: "Kai'Sa", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Kalista", tags: ["Marksman"], role: "Marksman" },
  { name: "Karma", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Karthus", tags: ["Mage"], role: "Mage" },
  { name: "Kassadin", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Katarina", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Kayle", tags: ["Mage", "Marksman"], role: "Mage" },
  { name: "Kayn", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Kennen", tags: ["Mage"], role: "Mage" },
  { name: "Kha'Zix", tags: ["Assassin"], role: "Assassin" },
  { name: "Kindred", tags: ["Marksman"], role: "Marksman" },
  { name: "Kled", tags: ["Fighter"], role: "Fighter" },
  { name: "Kog'Maw", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "K'Sant\u00e9", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "LeBlanc", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Lee Sin", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Leona", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Lillia", tags: ["Fighter", "Mage"], role: "Fighter" },
  { name: "Lissandra", tags: ["Mage"], role: "Mage" },
  { name: "Lucian", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Lulu", tags: ["Support", "Mage"], role: "Support" },
  { name: "Lux", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Malphite", tags: ["Tank", "Mage"], role: "Tank" },
  { name: "Malzahar", tags: ["Mage"], role: "Mage" },
  { name: "Maokai", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Ma\u00eetre Yi", tags: ["Assassin", "Fighter"], role: "Assassin" },
  { name: "Milio", tags: ["Support", "Mage"], role: "Support" },
  { name: "Miss Fortune", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Wukong", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Mordekaiser", tags: ["Fighter", "Mage"], role: "Fighter" },
  { name: "Morgana", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Naafiri", tags: ["Assassin", "Fighter"], role: "Assassin" },
  { name: "Nami", tags: ["Support", "Mage"], role: "Support" },
  { name: "Nasus", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Nautilus", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Neeko", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Nidalee", tags: ["Assassin", "Mage"], role: "Assassin" },
  { name: "Nilah", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Nocturne", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Nunu et Willump", tags: ["Tank", "Mage"], role: "Tank" },
  { name: "Olaf", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Orianna", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Ornn", tags: ["Tank"], role: "Tank" },
  { name: "Pantheon", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Poppy", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "Pyke", tags: ["Support", "Assassin"], role: "Support" },
  { name: "Qiyana", tags: ["Assassin"], role: "Assassin" },
  { name: "Quinn", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Rakan", tags: ["Support"], role: "Support" },
  { name: "Rammus", tags: ["Tank"], role: "Tank" },
  { name: "Rek'Sai", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Rell", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Renata Glasc", tags: ["Support", "Mage"], role: "Support" },
  { name: "Renekton", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Rengar", tags: ["Assassin", "Fighter"], role: "Assassin" },
  { name: "Riven", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Rumble", tags: ["Fighter", "Mage"], role: "Fighter" },
  { name: "Ryze", tags: ["Mage"], role: "Mage" },
  { name: "Samira", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Sejuani", tags: ["Tank"], role: "Tank" },
  { name: "Senna", tags: ["Support", "Marksman"], role: "Support" },
  { name: "S\u00e9raphine", tags: ["Support", "Mage"], role: "Support" },
  { name: "Sett", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Shaco", tags: ["Assassin"], role: "Assassin" },
  { name: "Shen", tags: ["Tank"], role: "Tank" },
  { name: "Shyvana", tags: ["Fighter", "Mage"], role: "Fighter" },
  { name: "Singed", tags: ["Tank", "Mage"], role: "Tank" },
  { name: "Sion", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "Sivir", tags: ["Marksman"], role: "Marksman" },
  { name: "Skarner", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "Smolder", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Sona", tags: ["Support", "Mage"], role: "Support" },
  { name: "Soraka", tags: ["Support", "Mage"], role: "Support" },
  { name: "Swain", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Sylas", tags: ["Mage", "Assassin"], role: "Mage" },
  { name: "Syndra", tags: ["Mage"], role: "Mage" },
  { name: "Tahm Kench", tags: ["Tank", "Support"], role: "Tank" },
  { name: "Taliyah", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Talon", tags: ["Assassin"], role: "Assassin" },
  { name: "Taric", tags: ["Support", "Tank"], role: "Support" },
  { name: "Teemo", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Thresh", tags: ["Support", "Tank"], role: "Support" },
  { name: "Tristana", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Trundle", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Tryndamere", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Twisted Fate", tags: ["Mage", "Marksman"], role: "Mage" },
  { name: "Twitch", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Udyr", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Urgot", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Varus", tags: ["Marksman", "Mage"], role: "Marksman" },
  { name: "Vayne", tags: ["Marksman", "Assassin"], role: "Marksman" },
  { name: "Veigar", tags: ["Mage"], role: "Mage" },
  { name: "Vel'Koz", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Vex", tags: ["Mage"], role: "Mage" },
  { name: "Vi", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Viego", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Viktor", tags: ["Mage"], role: "Mage" },
  { name: "Vladimir", tags: ["Mage", "Fighter"], role: "Mage" },
  { name: "Volibear", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Warwick", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Xayah", tags: ["Marksman"], role: "Marksman" },
  { name: "Xerath", tags: ["Mage", "Support"], role: "Mage" },
  { name: "Xin Zhao", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Yasuo", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Yone", tags: ["Fighter", "Assassin"], role: "Fighter" },
  { name: "Yorick", tags: ["Fighter", "Tank"], role: "Fighter" },
  { name: "Yuumi", tags: ["Support", "Mage"], role: "Support" },
  { name: "Zac", tags: ["Tank", "Fighter"], role: "Tank" },
  { name: "Zed", tags: ["Assassin"], role: "Assassin" },
  { name: "Zeri", tags: ["Marksman"], role: "Marksman" },
  { name: "Ziggs", tags: ["Mage"], role: "Mage" },
  { name: "Zilean", tags: ["Support", "Mage"], role: "Support" },
  { name: "Zo\u00e9", tags: ["Mage"], role: "Mage" },
  { name: "Zyra", tags: ["Mage", "Support"], role: "Mage" },
];

export function LolChampions({ onChampionChange }: LolChampionsProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedAgent, setSelectedChampion] = React.useState<{
    name: string;
    role: string;
  } | null>(null);

  const handleSelectChampion = (champion: { name: string; role: string }) => {
    setSelectedChampion(champion);
    onChampionChange(champion); // Remonte la valeur au parent
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
