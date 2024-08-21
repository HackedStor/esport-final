import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const handleDelete = () => alert("News Supprimé");

function DropdownMenuCheckboxes() {
  const [NewsVisible, setNewsVisible] = React.useState<Checked>(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="TableBtn">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 TableModal">
        <DropdownMenuCheckboxItem
          checked={NewsVisible}
          onCheckedChange={setNewsVisible}
        >
          Visible
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TableDemo() {
  interface NewsItem {
    title: string;
    description: string;
    is_visible: string;
  }

  const [newsData, setNewsData] = React.useState<NewsItem[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://esport/src/php/getNews.php");
      if (!response.ok) {
        throw new Error("Échec de la recherche de nouvelles");
      }
      const data = await response.json();

      // Vérification du message dans la réponse
      if ("message" in data && data.message === "Pas d'annonces disponibles") {
        setNewsData(data);
      } else {
        setNewsData(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des actualités.");
      console.error("Erreur lors de la récupération des actualités:", error);
    }
  };

  fetchNews();

  return (
    <div className="NewsTable">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsData.map((newsItem) => (
            <TableRow className="NewsTableRow">
              <TableCell className="font-medium">{newsItem.title}</TableCell>
              <TableCell>{newsItem.is_visible}</TableCell>
              <TableCell>{newsItem.description.slice(0, 40)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenuCheckboxes />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
