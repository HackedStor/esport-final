/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
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

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaUserCheck, FaUserMinus, FaUserClock, FaCheck, FaFileExport} from "react-icons/fa";
import { BiSolidFlagAlt } from "react-icons/bi";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import "../../assets/css/Dashboard.css";
import toast, { Renderable, Toast, Toaster, ValueFunction } from "react-hot-toast";

// Types
export type Player = {
  id: number;
  user_id: number;
  nom: string;
  prenom: string;
  classe: string;
  date: string;
  table_name: string;
};

// Notifications
const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.success(text);
const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.error(text);

const handleBlackLisUser = async (userId :number) => {
  alert("Attention cette action est irreversible voulez vous vraiment inscrire l'utilisateur sur la liste noir ? Si c'est le cas alors merci de lui envoyer un mail pour le prévenir")
  try {
    const response = await fetch(
      "/php/Member/BlackListUser.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      }
    );

    const data = await response.json();
    if (data.success) {
      setTimeout(() => window.location.reload(), 2000);
      notify_ok(data.message);
      // notify_ok(data.userId);
    } else {
      setTimeout(() => window.location.reload(), 2000);
      notify_err(data.message);
    }
  } catch (error) {
    setTimeout(() => window.location.reload(), 2000);
    notify_err("Nous somes désolé, le service est indisponible.");
  }
};

// Fonction pour mettre à jour l'état d'un joueur
const updatePlayerStatus = async (userId: number, status: string) => {
  const endpointMap: Record<string, string> = {
    present: "present_player.php",
    absent: "abs_player.php",
    late: "late_player.php",
  };

  try {
    const response = await fetch(`/php/call/${endpointMap[status]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (data.success) {
      // setTimeout(() => window.location.reload(), 2000);
      notify_ok(data.message);
    } else {
      // setTimeout(() => window.location.reload(), 2000);
      notify_err(data.message);
    }
  } catch (error) {
    // setTimeout(() => window.location.reload(), 2000);
    notify_err("Nous sommes désolé, le service est indisponible.");
  }
};

// Fonction pour générer le CSV
const generateCSV = async () => {
  try {
    const response = await fetch("/php/call/generate_csv.php");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setTimeout(() => window.location.reload(), 2000);
    notify_ok("CSV généré avec succès.");
  } catch (error) {
    setTimeout(() => window.location.reload(), 2000);
    notify_err("Erreur lors de la génération du fichier CSV.");
  }
};

const attendanceFinish = async () => {
  try {
    const response = await fetch("/php/call/attendanceFinish.php");
    const data = await response.json();
    if (data.success) {
      setTimeout(() => window.location.reload(), 2000);
      notify_ok(data.message);
    } else {
      setTimeout(() => window.location.reload(), 2000);
      notify_err(data.message);
    }
  } catch (error) {
    notify_err("Nous sommes désolé, le service est indisponible.");
  }
};

// Colonnes du tableau
export const columns: ColumnDef<Player>[] = [
  { accessorKey: "nom", header: "Nom", cell: ({ row }) => <div className="capitalize">{row.getValue("nom")}</div> },
  { accessorKey: "prenom", header: "Prénom", cell: ({ row }) => <div className="capitalize">{row.getValue("prenom")}</div> },
  { accessorKey: "classe", header: "Classe", cell: ({ row }) => <div className="capitalize">{row.getValue("classe")}</div> },
  { accessorKey: "date", header: "Date de la session", cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div> },
  { accessorKey: "table_name", header: "Crénau de l'élève", cell: ({ row }) => <div className="capitalize">{row.getValue("table_name")}</div> },
  {
    id: "actions",
    cell: ({ row }) => {
      const player = row.original;
      const playerID = player.user_id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="TableModal">
            <DropdownMenuLabel>Actions possible</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerID, "present")}>
              <FaUserCheck className="mr-2 h-4 w-4" /> Présent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerID, "absent")}>
              <FaUserMinus className="mr-2 h-4 w-4" /> Absent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerID, "late")}>
              <FaUserClock className="mr-2 h-4 w-4" /> Retard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleBlackLisUser(playerID)}>
              <BiSolidFlagAlt className="mr-2 h-4 w-4" /> Inscrire l'utilisateur sur la liste noire
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Composant principal
export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
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
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/php/Member/getPlayerNextSession.php");
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
          placeholder="Filtrer les noms..."
          value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("nom")?.setFilterValue(event.target.value)}
          className="max-w-sm TableInput"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto TableBtn">
              Sections <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="TableModal">
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" onClick={generateCSV} className="TableBtn">
          <FaFileExport className="mr-2 h-4 w-4 r" />
          Exporter CSV
        </Button>
        <Button variant="outline" onClick={attendanceFinish} className="TableBtn">
          <FaCheck className="mr-2 h-4 w-4" />
          Appel effectué
        </Button>
      </div>

      <Toaster />
    </div>
  );
}
