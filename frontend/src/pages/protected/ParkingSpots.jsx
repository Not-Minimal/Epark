"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Component() {
  const [parkingEspacios, setParkingEspacios] = useState([
    { id: 1, status: "ocupado", lastocupado: "2023-06-29 10:15 AM" },
    { id: 2, status: "libre", lastocupado: null },
    { id: 3, status: "ocupado", lastocupado: "2023-06-29 11:30 AM" },
    { id: 4, status: "libre", lastocupado: null },
    { id: 5, status: "ocupado", lastocupado: "2023-06-29 9:45 AM" },
    { id: 6, status: "libre", lastocupado: null },
    { id: 7, status: "ocupado", lastocupado: "2023-06-29 12:00 PM" },
    { id: 8, status: "libre", lastocupado: null },
    { id: 9, status: "ocupado", lastocupado: "2023-06-29 1:20 PM" },
    { id: 10, status: "libre", lastocupado: null },
    { id: 11, status: "ocupado", lastocupado: "2023-06-29 2:10 PM" },
    { id: 12, status: "libre", lastocupado: null },
    { id: 13, status: "ocupado", lastocupado: "2023-06-29 3:00 PM" },
    { id: 14, status: "libre", lastocupado: null },
    { id: 15, status: "ocupado", lastocupado: "2023-06-29 3:45 PM" },
    { id: 16, status: "libre", lastocupado: null },
    { id: 17, status: "ocupado", lastocupado: "2023-06-29 4:30 PM" },
    { id: 18, status: "libre", lastocupado: null },
    { id: 19, status: "ocupado", lastocupado: "2023-06-29 5:15 PM" },
    { id: 20, status: "libre", lastocupado: null },
  ]);
  const [filteredEspacios, setFilteredEspacios] = useState(parkingEspacios);
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const handleFilterChange = (status) => {
    if (status === "all") {
      setFilteredEspacios(parkingEspacios);
    } else {
      setFilteredEspacios(
        parkingEspacios.filter((Espacio) => Espacio.status === status),
      );
    }
  };
  const handleEspacioClick = (Espacio) => {
    setSelectedEspacio(Espacio);
  };
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8">Parking Espacio Management</h1>
      <div className="mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              <span>Filter by</span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => handleFilterChange("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilterChange("libre")}>
              libre
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilterChange("ocupado")}>
              ocupado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredEspacios.map((Espacio) => (
          <div
            key={Espacio.id}
            className="bg-white p-4 rounded-lg cursor-pointer hover:bg-muted/50"
            onClick={() => handleEspacioClick(Espacio)}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Espacio {Espacio.id}</div>
              <div
                className={`w-4 h-4 rounded-full ${Espacio.status === "libre" ? "bg-green-500" : "bg-red-500"}`}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {Espacio.status === "libre"
                ? "Disponible"
                : `ocupado desde ${Espacio.lastocupado}`}
            </div>
          </div>
        ))}
      </div>
      {selectedEspacio && (
        <Dialog open onOpenChange={() => setSelectedEspacio(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Parking Espacio {selectedEspacio.id}</DialogTitle>
            </DialogHeader>
            <div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Status</div>
                  <div
                    className={`w-4 h-4 rounded-full ${selectedEspacio.status === "libre" ? "bg-green-500" : "bg-red-500"}`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Last ocupado</div>
                  <div>
                    {selectedEspacio.lastocupado
                      ? selectedEspacio.lastocupado
                      : "Never"}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setSelectedEspacio(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
