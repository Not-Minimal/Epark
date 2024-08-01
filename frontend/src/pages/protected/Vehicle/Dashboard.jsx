import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/vehicle/dashboard">Vehículo</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main>
        <div className="flex flex-col items-center justify-center h-auto gap-4 ">
          <Link to="/vehicle/GetByLicensePlate">
            <Button className="w-64 bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md focus:outline-none">
              Buscar vehículo por su patente
            </Button>
          </Link>
          <Link to="/vehicle/UpdateVehicleByLicensePlate">
            <Button className="w-64 bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md focus:outline-none">
              Editar vehículo según su patente
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
