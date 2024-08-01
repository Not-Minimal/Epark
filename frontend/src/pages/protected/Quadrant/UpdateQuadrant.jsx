import { useState, useEffect } from "react";
import { updateQuadrant, getQuadrant } from "@/services/quadrant.service.js";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UpdateQuadrants = () => {
  //? Guarda el id y nombre del cuadrante ingresado en el formulario
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  //? Guarda el mensaje de error o exito
  const [message, setMessage] = useState("");
  //? Guarda los cuadrantes obtenidos de la base de datos
  const [quadrants, setQuadrants] = useState([]);

  const handleSubmit = async (e) => {
    //? Evita que la pagina se recargue al enviar el formulario
    e.preventDefault();
    try {
      //? Llama la funcion updateQuadrant desde service.js y actualiza con el nuevo nombre
      const response = await updateQuadrant(id, { name });
      setMessage("Cuadrante actualizado con éxito!!");
      //? Limpia el espacio de id
      setId("");
      //? Limpia el espacio del nombre
      setName("");
      //? Actualiza la lista de cuadrantes
      fetchQuadrants();
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Error interno del servidor");
    }
  };

  //? Obtener todos los cuadrantes del mongo
  const fetchQuadrants = async () => {
    try {
      //? espera hasta obtener todos los cuadrantes
      const data = await getQuadrant();
      //? actualiza con los datos obtenidos
      setQuadrants(data.data);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Error interno del servidor");
    }
  };

  //? se ejecuta y llama a fetchQuadrant para obtener todos los cuadrantes
  //? y renderiza la tabla del cuadrante utilizando el estado quadrant
  useEffect(() => {
    fetchQuadrants();
  }, []);

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
              <BreadcrumbLink href="/support/updateissue">
                Actualizar Cuadrante
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="bg-white p-2 rounded shadow-md w-full max-w-lg">
            <h1 className="text-3xl font-bold mb-1">Actualizar Cuadrante</h1>
            {message && <div className="mb-4 text-center text-sm text-gray-700">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                ID del Cuadrante
                </label>
                <input
                  type="text"
                  id="id"
                  placeholder="Ingrese el ID del cuadrante"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre del Cuadrante
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ingrese el nuevo nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 hover:bg-green-700 hover:scale-105"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
          <div className="mt-12 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Cuadrantes Existentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-6 border-b text-left">ID</th>
                    <th className="py-3 px-6 border-b text-left">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {quadrants.map((quadrant) => (
                    <tr key={quadrant._id} className="border-t">
                      <td className="py-3 px-6 border-b">{quadrant._id}</td>
                      <td className="py-3 px-6 border-b">{quadrant.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateQuadrants;
