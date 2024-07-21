import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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

export default function Dashboard() {
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
                <TableHead>Estado</TableHead>
                <TableHead>Metodo</TableHead>
                <TableHead className="text-right">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ISSUE001</TableCell>
                <TableCell>En proceso</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell className="text-right">Ver</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
