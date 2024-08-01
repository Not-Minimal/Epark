import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <main>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Link to="/vehicle/GetByLicensePlate"><Button className="bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md">
        Buscar vehículo por su patente
      </Button></Link>
      <Button className="bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md">
        Editar vehículo según su patente
      </Button>
    </div>
      </main>
    </>
  );
}


