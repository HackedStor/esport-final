import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import React from "react";

interface SheetProps {
  label: string;
}

const CustomSheet: React.FC<SheetProps> = ({ label }) => {
  {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="SheetBtn">
            {label}
          </Button>
        </SheetTrigger>
        <SheetContent className="Sheet">
          <SheetHeader>
            <SheetTitle>Modifier le profil pour {label}</SheetTitle>
            <SheetDescription>
              Modifiez votre profil pour le jeu {label} afin de suivre votre
              activité.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }
};

export default CustomSheet;
