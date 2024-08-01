import { useState } from "react";
import { createQuadrant } from "@/services/quadrant.service.js";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CreateQuadrants = () => {
  //? Guarda el nombre del cuadrante ingresado en el formulario
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    //? evita que la pagina se recargue al enviar el formulario
    e.preventDefault();
    try {
      //? Aquí llamamos a la función createQuadrant del servicio
      const response = await createQuadrant({ name });
      setMessage("Cuadrante creado con éxito!!");
      setName("");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Se exedio el limite, No se pueden crear mas de 4 cuadrantes!");
    }
  };

  return (
    <>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/support/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/support/createissue">
                Crear Cuadrante
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h1 className="text-3xl font-bold mb-8">Crear Cuadrantes</h1>
            {message && <div className="mb-4 text-center text-sm text-gray-700">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre del Cuadrante
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ingrese el nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 hover:bg-green-700 hover:scale-105"                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateQuadrants;
