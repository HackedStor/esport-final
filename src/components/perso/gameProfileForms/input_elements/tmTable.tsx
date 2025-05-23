/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
     // CaretSortIcon,
     ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
     ColumnDef,
     ColumnFiltersState,
     SortingState,
     VisibilityState,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     getSortedRowModel,
     useReactTable,
} from "@tanstack/react-table";

import { Button } from "../../../ui/button";
import {
     DropdownMenu,
     DropdownMenuCheckboxItem,
     DropdownMenuContent,
     DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "../../../ui/table";

export type Player = {
     id: number;
     user_id: number;
     nom: string;
     prenom: string;
     classe: string;
     date: string;
};

export const columns: ColumnDef<Player>[] = [
     {
          accessorKey: "map_name",
          header: "Circuit",
          cell: ({ row }) => (
               <div className="capitalize">{row.getValue("map_name")}</div>
          ),
     },
     // {
     //   accessorKey: "trynb",
     //   header: "Nombre d'essais",
     //   cell: ({ row }) => (
     //     <div className="capitalize">{row.getValue("trynb")}</div>
     //   ),
     // },
     {
          accessorKey: "score",
          header: "Temps",
          cell: ({ row }) => (
               <div className="capitalize">{row.getValue("score")}</div>
          ),
     },
     {
          accessorKey: "date_created",
          header: "Date de la course",
          cell: ({ row }) => (
               <div className="capitalize">{row.getValue("date_created")}</div>
          ),
     },
];

export function TmTable() {
     const [sorting, setSorting] = React.useState<SortingState>([]);
     const [columnFilters, setColumnFilters] =
          React.useState<ColumnFiltersState>([]);
     const [columnVisibility, setColumnVisibility] =
          React.useState<VisibilityState>({});
     const [rowSelection, setRowSelection] = React.useState({});
     const [data, setData] = React.useState<Player[]>([]);

     const table = useReactTable({
          data,
          columns,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          onColumnVisibilityChange: setColumnVisibility,
          onRowSelectionChange: setRowSelection,
          state: {
               sorting,
               columnFilters,
               columnVisibility,
               rowSelection,
          },
     });

     React.useEffect(() => {
          async function fetchData() {
               const response = await fetch("/php/GetStats/getTmStats.php");
               const result = await response.json();
               setData(result);
               console.log("Données récupérées :", result);
          }
          fetchData();
     }, []);

     return (
          <div className="w-full">
               <div className="flex items-center py-4">
                    <Input
                         placeholder="Filtrer les maps..."
                         value={
                              (table
                                   .getColumn("map")
                                   ?.getFilterValue() as string) ?? ""
                         }
                         onChange={(event) =>
                              table
                                   .getColumn("map")
                                   ?.setFilterValue(event.target.value)
                         }
                         className="max-w-sm TableInput"
                    />
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button
                                   variant="outline"
                                   className="ml-auto TableBtn"
                              >
                                   Sections{" "}
                                   <ChevronDownIcon className="ml-2 h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent
                              align="end"
                              className="TableModal"
                         >
                              {table
                                   .getAllColumns()
                                   .filter((column) => column.getCanHide())
                                   .map((column) => (
                                        <DropdownMenuCheckboxItem
                                             key={column.id}
                                             className="capitalize"
                                             checked={column.getIsVisible()}
                                             onCheckedChange={(value) =>
                                                  column.toggleVisibility(
                                                       !!value
                                                  )
                                             }
                                        >
                                             {column.id}
                                        </DropdownMenuCheckboxItem>
                                   ))}
                         </DropdownMenuContent>
                    </DropdownMenu>
               </div>
               <div className="rounded-md border Table">
                    <Table>
                         <TableHeader className="TableTitleRow">
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                             <TableHead key={header.id}>
                                                  {header.isPlaceholder
                                                       ? null
                                                       : flexRender(
                                                              header.column
                                                                   .columnDef
                                                                   .header,
                                                              header.getContext()
                                                         )}
                                             </TableHead>
                                        ))}
                                   </TableRow>
                              ))}
                         </TableHeader>
                         <TableBody>
                              {table.getRowModel().rows.length ? (
                                   table.getRowModel().rows.map((row) => (
                                        <TableRow
                                             key={row.id}
                                             className="TableRow"
                                             data-state={
                                                  row.getIsSelected() &&
                                                  "selected"
                                             }
                                        >
                                             {row
                                                  .getVisibleCells()
                                                  .map((cell) => (
                                                       <TableCell key={cell.id}>
                                                            {flexRender(
                                                                 cell.column
                                                                      .columnDef
                                                                      .cell,
                                                                 cell.getContext()
                                                            )}
                                                       </TableCell>
                                                  ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell
                                             colSpan={columns.length}
                                             className="h-24 text-center"
                                        >
                                             Aucun résultat.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>
               <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="space-x-2">
                         <Button
                              className="TableBtn"
                              variant="outline"
                              size="sm"
                              onClick={() => table.previousPage()}
                              disabled={!table.getCanPreviousPage()}
                         >
                              Précédent
                         </Button>
                         <Button
                              className="TableBtn"
                              variant="outline"
                              size="sm"
                              onClick={() => table.nextPage()}
                              disabled={!table.getCanNextPage()}
                         >
                              Suivant
                         </Button>
                    </div>
               </div>
          </div>
     );
}
