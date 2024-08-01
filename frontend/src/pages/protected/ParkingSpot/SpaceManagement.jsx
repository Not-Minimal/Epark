import { Button } from "@/components/ui/button";
import { deleteOneSpace } from "@/services/parkingSpot.service";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";

export default function SpaceManagement(){
    const { toast } = useToast();
    const location = useLocation();
    const { selectedCuadrante } = location.state || {};

    const deleteSpace = async () => {
        
        console.log(`Data del cuadrante seleccionado id: ${selectedCuadrante._id}`)

          await deleteOneSpace(selectedCuadrante._id)
            .then(
                toast({
                    title: "Eliminar un espacio",
                    description: `Se elimino un espacio del  ${selectedCuadrante.name} correctamente.`,
                })
            )
            .catch((error)=>{
                toast({
                    variant:"destructive",
                    title: "Error",
                    description: `Ocurrio un error al eliminar un espacio`,
                })
                console.error("Error Delete space:", error)
            });
            

    };

    return (
        <main>
            
            <div className="min-h-screen">
            <Breadcrumb className="mt-20  mb-5 ">
                <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/home">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                    <BreadcrumbLink href="/parking-spots">
                      Parking Spot
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/support/createissue">
                      Administrar Espacios
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
                <h1 className="  text-3xl ">
                    Administrar Espacios del {selectedCuadrante.name}
                </h1>
                
                <Button className="mt-5 bg-red-500 "
                    onClick={deleteSpace}
                >
                    Eliminar un espacio
                </Button>
                 
            </div> 

        </main>
    );
}