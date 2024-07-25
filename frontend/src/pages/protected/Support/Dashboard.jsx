import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getIssues } from "@/services/issue.service";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await getIssues();
        console.log("Issues:", response);
        setIssues(response.data); // Aquí accedes a la propiedad `data`
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    fetchIssues();
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
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main>
        <div className="flex flex-row my-8 justify-between">
          <Link to="/support/createissue" className="mb-8">
            <Button>Crear Reclamo</Button>
          </Link>
          <Link to="/support/viewissue">
            <Button>Visualizar Reclamo</Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl py-8">Listado de Problemas Recientes</h1>
          <Table>
            <TableCaption>Una lista de los problemas recientes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID Problema</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripcion</TableHead>
                <TableHead className="text-right">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue._id}>
                  <TableCell className="font-medium">{issue._id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell className="text-right">Ver</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
