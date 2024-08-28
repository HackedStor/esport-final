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

interface MkMapsProps {
  onMapChange: (map: { name: string }) => void;
}

const maps = [
    { name: "Mario Kart Stadium" },
    { name: "Water Park" },
    { name: "Sweet Sweet Canyon" },
    { name: "Thwomp Ruins" },
    { name: "Moo Moo Meadows" },
    { name: "Mario Circuit" },
    { name: "Cheep Cheep Beach" },
    { name: "Toad's Turnpike" },
    { name: "Mario Circuit" },
    { name: "Toad Harbor" },
    { name: "Twisted Mansion" },
    { name: "Shy Guy Falls" },
    { name: "Dry Dry Desert" },
    { name: "Donut Plains 3" },
    { name: "Royal Raceway" },
    { name: "DK Jungle" },
    { name: "Sunshine Airport" },
    { name: "Dolphin Shoals" },
    { name: "Electrodrome" },
    { name: "Mount Wario" },
    { name: "Wario Stadium" },
    { name: "Sherbet Land" },
    { name: "Music Park" },
    { name: "Yoshi Valley" },
    { name: "Cloudtop Cruise" },
    { name: "Bone-Dry Dunes" },
    { name: "Bowser's Castle" },
    { name: "Rainbow Road" },
    { name: "Tick-Tock Clock" },
    { name: "Piranha Plant Slide" },
    { name: "Grumble Volcano" },
    { name: "Rainbow Road" }
  ];
  
export function MkMaps({ onMapChange: onMapChange }: MkMapsProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState<{
    name: string;
  } | null>(null);

  const handleSelectMap = (map: { name: string }) => {
    setSelectedMap(map);
    onMapChange(map); // Remonte la valeur au parent
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
          {selectedMap ? selectedMap.name : "Circuit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Trouvez un circuit..." />
          <CommandList>
            <CommandEmpty>Aucun circuit trouvé.</CommandEmpty>
            <CommandGroup>
              {maps.map((map) => (
                <CommandItem
                  key={map.name}
                  onSelect={() => handleSelectMap(map)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMap?.name === map.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {map.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
