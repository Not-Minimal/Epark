import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/Quadrant/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/Quadrant/viewQuadrant">
                Ver Cuadrante
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main>
        <div className="flex flex-col items-center justify-center h-auto gap-4 ">
          <Link to="/quadrants/create">
            <Button className="w-64 bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md focus:outline-none">
              Crear Cuadrante
            </Button>
          </Link>

          <Link to="/quadrants/update">
            <Button className="w-64 bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md focus:outline-none">
              Actualizar Cuadrante
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
