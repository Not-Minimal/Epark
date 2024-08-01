"use client";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { viewFreeSpaces } from '@/services/parkingSpot.service';
import { getQuadrants } from '@/services/quadrant.service'; 
import { viewOccupiedSpaces } from '@/services/parkingSpot.service';

export default function Component() {
  const [parkingCuadrantes, setParkingCuadrantes] = useState();
  const [filteredCuadrantes, setFilteredCuadrantes] = useState([]);
  const [selectedCuadrante, setSelectedCuadrante] = useState(null);
  const [freeSpaces, setFreeSpaces] = useState(null);
  const [occupiedSpaces, setoccupiedSpaces] = useState(null);


  // Function to fetch quadrants
  const fetchQuadrants = async () => {
    try {
      const { data } = await getQuadrants();
      setParkingCuadrantes(data);
      setFilteredCuadrantes(data);
      console.log("Fetched Quadrants:", data); // Verifica los datos obtenidos
    } catch (error) {
      console.error("Error fetching quadrants:", error);
    }
  };

  // Function to fetch free spaces for a selected quadrant
  const fetchFreeSpaces = async (id) => {
    if (!id) {
      console.error("No valid id ");
      return;
    }
    try {
      const spaces = await viewFreeSpaces(id);
      setFreeSpaces(spaces);
    } catch (error) {
      console.error("Error fetch free spaces:", error);
    }
  };

  const fetchOccupiedSpaces = async (id) => {
    if (!id) {
      console.error("No valid id ");
      return;
    }
    try {
      const spaces = await viewOccupiedSpaces(id);
      setoccupiedSpaces(spaces);
    } catch (error) {
      console.error("Error fetch free spaces:", error);
    }
  };

  // Fetch quadrants on component mount
  useEffect(() => {
    fetchQuadrants();
    const intervalId = setInterval(fetchQuadrants, 5000); // 5000 ms = 5 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Fetch free spaces when selectedCuadrante changes
  useEffect(() => {
    if (selectedCuadrante && selectedCuadrante._id) {
      fetchFreeSpaces(selectedCuadrante._id);
    }
  }, [selectedCuadrante]);

  useEffect(() => {
    if (selectedCuadrante && selectedCuadrante._id) {
      fetchOccupiedSpaces(selectedCuadrante._id);
    }
  }, [selectedCuadrante]);

  const handleFilterChange = (status) => {
    if (status === "all") {
      setFilteredCuadrantes(parkingCuadrantes);
    } else if (status === "Disponible") {
      setFilteredCuadrantes(
        parkingCuadrantes.filter((cuadrante) => !cuadrante.full)
      );
    } else if (status === "ocupado") {
      setFilteredCuadrantes(
        parkingCuadrantes.filter((cuadrante) => cuadrante.full)
      );
    }
  };

  const handleCuadranteClick = (id) => {
    const selected = parkingCuadrantes.find((cuadrante) => cuadrante._id === id);
    console.log("Selected Cuadrante:", selected._id); // Verifica el cuadrante seleccionado
    setSelectedCuadrante(selected);
  };

  const navigate = useNavigate();

  return (
    <div className='min-h-screen'>
      <Breadcrumb className=" mt-20 mb-5">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/home">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/parking-spots">
                      Parking Spots
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
      <h1 className="text-3xl mb-8 ">Parking Quadrant Management</h1>
      
      <div className="mb-8 ">
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
            <DropdownMenuItem onSelect={() => handleFilterChange("Disponible")}>
              Disponible
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilterChange("ocupado")}>
              Ocupado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {filteredCuadrantes.map((cuadrante) => (
          <div
            key={cuadrante._id}
            className="bg-white p-4 rounded-lg cursor-pointer hover:bg-muted/50"
            onClick={() => handleCuadranteClick(cuadrante._id)}
          >
            <div className="flex items-center justify-between">

              <div className="text-lg font-semibold">{cuadrante.name}</div>
              <div
                className={`w-4 h-4 rounded-full ${cuadrante.full == true ? "bg-red-500" : "bg-green-500"}`}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {cuadrante.full == true
                ? `Ocupado`
                : "Disponible"}
            </div>
          </div>
        ))}
      </div>
      {selectedCuadrante && (
        <Dialog open onOpenChange={() => setSelectedCuadrante(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
            <DialogTitle>{selectedCuadrante.name}</DialogTitle>

            </DialogHeader>
            <div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Status</div>
                  <div
                    className={`w-4 h-4 rounded-full ${selectedCuadrante.full ? "bg-red-500" : "bg-green-500"}`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Espacios Libres</div>
                  <div className="text-sm">
                    {freeSpaces !== null ? (
                      freeSpaces
                    ) : (
                      "null"
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Espacios Ocupados</div>
                  <div className="text-sm">
                    {occupiedSpaces !== null ? (
                      occupiedSpaces
                    ) : (
                      "null"
                    )}
                  </div>
                </div>

              </div>
            </div>
            <DialogFooter>       
              <Button
                variant="ghost"
                onClick={() => {
                  
                  navigate('/parkingspot/spacemanagement', { state: { selectedCuadrante } });
                }}
              >
                Administrar espacios
              </Button>

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
