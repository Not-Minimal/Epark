import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getVehicleByLicensePlate, updatedVehicleByLicensePlate } from "@/services/vehicle.service.js";

export default function GetByLicensePlate() {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const vehicleData = await getVehicleByLicensePlate(licensePlate);
      setVehicle(vehicleData.data);
      setError("");
    } catch (err) {
      setError(err.message || "Error al buscar el vehículo");
      setVehicle(null);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [id]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      await updatedVehicleByLicensePlate(licensePlate, {
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,  // Asegúrate de que las claves coincidan con los nombres esperados en el controlador
        color: vehicle.color,
        brand: vehicle.brand,
      });
      setError("");
      alert("Vehículo actualizado exitosamente");
    } catch (err) {
      setError(err.message || "Error al actualizar el vehículo");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-stone-50">
      <Card className="p-8 rounded-lg shadow-md w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-600">Buscar Patente</CardTitle>
          <CardDescription className="text-gray-600">
            Ingresa la patente de tu vehículo a editar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="Ingresa la patente"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <Button
            onClick={handleSearch}
            className="w-full px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Buscar
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          
          {vehicle && (
            <div className="mt-4">
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="licensePlate">Patente</Label>
                    <Input
                      id="licensePlate"
                      value={vehicle.licensePlate || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      value={vehicle.model || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={vehicle.color || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      value={vehicle.brand || ""}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleEdit}
                  className="w-full mt-4 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Editar
                </Button>
              </CardFooter>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
