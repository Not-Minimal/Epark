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
  const [parkingCuadrantes, setParkingCuadrantes] = useState([
    { id: 1, status: "ocupado", lastocupado: "2023-06-29 10:15 AM" },
    { id: 2, status: "libre", lastocupado: null },
    { id: 3, status: "ocupado", lastocupado: "2023-06-29 11:30 AM" },
    { id: 4, status: "libre", lastocupado: null },
    { id: 5, status: "ocupado", lastocupado: "2023-06-29 9:45 AM" },
  ]);
  const [filteredCuadrantes, setFilteredCuadrantes] =
    useState(parkingCuadrantes);
  const [selectedCuadrante, setSelectedCuadrante] = useState(null);
  const handleFilterChange = (status) => {
    if (status === "all") {
      setFilteredCuadrantes(parkingCuadrantes);
    } else {
      setFilteredCuadrantes(
        parkingCuadrantes.filter((Cuadrante) => Cuadrante.status === status),
      );
    }
  };
  const handleCuadranteClick = (Cuadrante) => {
    setSelectedCuadrante(Cuadrante);
  };
  return (
    <div className="py-4 ">
      <h1 className="text-3xl font-bold mb-8">Parking Cuadrante Management</h1>
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
        {filteredCuadrantes.map((Cuadrante) => (
          <div
            key={Cuadrante.id}
            className="bg-white p-4 rounded-lg cursor-pointer hover:bg-muted/50"
            onClick={() => handleCuadranteClick(Cuadrante)}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Cuadrante {Cuadrante.id}
              </div>
              <div
                className={`w-4 h-4 rounded-full ${Cuadrante.status === "libre" ? "bg-green-500" : "bg-red-500"}`}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {Cuadrante.status === "libre"
                ? "Disponible"
                : `ocupado desde ${Cuadrante.lastocupado}`}
            </div>
          </div>
        ))}
      </div>
      {selectedCuadrante && (
        <Dialog open onOpenChange={() => setSelectedCuadrante(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Parking Cuadrante {selectedCuadrante.id}
              </DialogTitle>
            </DialogHeader>
            <div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Status</div>
                  <div
                    className={`w-4 h-4 rounded-full ${selectedCuadrante.status === "libre" ? "bg-green-500" : "bg-red-500"}`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Last ocupado</div>
                  <div>
                    {selectedCuadrante.lastocupado
                      ? selectedCuadrante.lastocupado
                      : "Never"}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setSelectedCuadrante(null)}
              >
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
