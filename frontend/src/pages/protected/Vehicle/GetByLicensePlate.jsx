import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getVehicleByLicensePlate } from '@/services/vehicle.service.js';

export default function GetByLicensePlate() {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const vehicleData = await getVehicleByLicensePlate(licensePlate);
      setVehicle(vehicleData.data); 
      setError('');
      console.log(vehicleData);
    } catch (err) {
      setError(err.message || 'Error al buscar el vehículo');
      setVehicle(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-50">
      <Card className="p-8 rounded-lg shadow-md w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Buscar Patente</CardTitle>
          <CardDescription>Ingresa la patente de tu vehículo</CardDescription>
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
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-bold">Vehículo Encontrado</h2>
              <p><strong>Patente:</strong> {vehicle.patente}</p>
              <p><strong>Modelo:</strong> {vehicle.modelo}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <p><strong>Marca:</strong> {vehicle.marca}</p>
              <p><strong>Usuario:</strong> {vehicle.usuario?.nombre_usuario}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}