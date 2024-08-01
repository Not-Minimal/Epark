import { Button } from "@/components/ui/button"

export default function Vehicle() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Button className="bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md">
        Buscar vehículo por su patente
      </Button>
      <Button className="bg-[#4CAF50] text-white hover:bg-[#45a049] px-8 py-3 rounded-md">
        Editar vehículo según su patente
      </Button>
    </div>
  )
}