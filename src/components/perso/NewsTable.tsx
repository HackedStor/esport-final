import React from "react";
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "../ui/table";
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

export function TableDemo() {
     interface NewsItem {
          id: number;
          title: string;
          description: string;
          is_visible: number;
     }

     const [newsData, setNewsData] = React.useState<NewsItem[] | null>(null);

     React.useEffect(() => {
          const fetchNews = async () => {
               try {
                    const response = await fetch("/php/getNewsFromAdmin.php");
                    if (!response.ok) {
                         throw new Error("Échec de la recherche de nouvelles");
                    }
                    const data = await response.json();

                    if (
                         "message" in data &&
                         data.message === "Pas d'annonces disponibles"
                    ) {
                         setNewsData(null);
                    } else {
                         setNewsData(data);
                    }
               } catch (error) {
                    console.error(
                         "Erreur lors de la récupération des actualités:",
                         error
                    );
                    setNewsData(null);
               }
          };

          fetchNews();
     }, []);

     const handleDelete = async (id: number) => {
          try {
               const response = await fetch("/php/Member/deleteNews.php", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
               });

               if (response.ok) {
                    setNewsData(
                         (prevData) =>
                              prevData?.filter((item) => item.id !== id) || null
                    );
               } else {
                    console.error(
                         "Erreur lors de la suppression de l'actualité."
                    );
               }
          } catch (error) {
               console.error("Erreur lors de la suppression:", error);
          }
     };

     const handleVisibilityChange = async (
          id: number,
          newVisibility: boolean
     ) => {
          try {
               const response = await fetch(
                    "/php/Member/changeNewsVisibility.php",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              id,
                              is_visible: newVisibility ? 1 : 0,
                         }),
                    }
               );

               if (response.ok) {
                    setNewsData(
                         (prevData) =>
                              prevData?.map((item) =>
                                   item.id === id
                                        ? {
                                               ...item,
                                               is_visible: newVisibility
                                                    ? 1
                                                    : 0,
                                          }
                                        : item
                              ) || null
                    );
               } else {
                    console.error(
                         "Erreur lors de la mise à jour de la visibilité."
                    );
               }
          } catch (error) {
               console.error(
                    "Erreur lors de la mise à jour de la visibilité:",
                    error
               );
          }
     };

     function DropdownMenuCheckboxes({
          id,
          isVisible,
     }: {
          id: number;
          isVisible: number;
     }) {
          const [NewsVisible, setNewsVisible] = React.useState<Checked>(
               isVisible === 1
          );

          const handleCheckedChange = (checked: Checked) => {
               const newVisibility = checked === true;
               setNewsVisible(newVisibility);
               handleVisibilityChange(id, newVisibility);
          };

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
                              onCheckedChange={handleCheckedChange}
                         >
                              Visible
                         </DropdownMenuCheckboxItem>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={() => handleDelete(id)}>
                              Supprimer
                         </DropdownMenuItem>
                    </DropdownMenuContent>
               </DropdownMenu>
          );
     }

     return (
          <div className="NewsTable">
               {newsData === null ? (
                    <p>Il n'y a pas d'annonces disponibles.</p>
               ) : (
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="w-[100px]">
                                        Nom
                                   </TableHead>
                                   <TableHead>Visible</TableHead>
                                   <TableHead>Description</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {newsData.map((newsItem) => (
                                   <TableRow
                                        className="NewsTableRow"
                                        key={newsItem.id}
                                   >
                                        <TableCell className="font-medium">
                                             {newsItem.title}
                                        </TableCell>
                                        <TableCell>
                                             {newsItem.is_visible === 1
                                                  ? "Oui"
                                                  : "Non"}
                                        </TableCell>
                                        <TableCell>
                                             {newsItem.description.slice(0, 40)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                             <DropdownMenuCheckboxes
                                                  id={newsItem.id}
                                                  isVisible={
                                                       newsItem.is_visible
                                                  }
                                             />
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               )}
          </div>
     );
}
