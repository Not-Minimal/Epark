import carImage from "@/assets/png/Ford.png";

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
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <header className="py-4 ">
        <div>
          {" "}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/support/dashboard">
                  Mi Vehiculo
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto p-8 bg-zinc-950 rounded-2xl">
          <div className="space-y-4 bg-zinc-900 rounded-2xl">
            <div className="flex items-start justify-center ">
              <img
                src={carImage}
                alt="Car Image"
                width={300}
                height={100}
                className="rounded-lg object-cover "
              />
            </div>
            <div className="px-16">
              <Separator className="blur bg-white" />
            </div>
            <div className="grid gap-6">
              <div className="p-6 bg-zinc-900 rounded-lg">
                <ul className="space-y-2 mt-4 text-muted-foreground">
                  <li>DETALLES</li>
                </ul>
                <h3 className="text-4xl font-semibold mt-4 text-white">
                  Mi Vehiculo
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 p-6 bg-zinc-900 rounded-lg">
              <div className="bg-zinc-950 rounded-3xl p-6">
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  ABC-123
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Patente</p>
                </div>
              </div>
              <div className="bg-zinc-950 rounded-3xl p-6">
                <h3 className="text-2xl font-semibold text-white">
                  Mountain Bike
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Marca</p>
                </div>
              </div>
              <div className="bg-zinc-950 rounded-3xl p-6">
                <h3 className="text-2xl font-semibold text-white">XYZ-456</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Modelo</p>
                </div>
              </div>
              <div className="bg-zinc-950 rounded-3xl p-6">
                <h3 className="text-2xl font-semibold text-white">Rojo</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Color</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="p-6 bg-zinc-900 rounded-lg">
              <h3 className="text-white text-lg font-semibold">Features</h3>
              <ul className="space-y-2 mt-4 text-muted-foreground">
                <li>- Leather Seats</li>
                <li>- Sunroof</li>
                <li>- Backup Camera</li>
                <li>- Bluetooth</li>
              </ul>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg">
              <h3 className="text-white text-lg font-semibold">Acciones</h3>
              <div className="grid grid-cols-2 gap-6 py-6 bg-zinc-900 rounded-lg">
                <div className="flex items-center justify-center bg-zinc-950 rounded-3xl p-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Actualizar
                  </h3>
                </div>
                <div className="flex items-center justify-center bg-red-500 rounded-3xl p-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Eliminar
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-zinc-950 rounded-lg">
            <h3 className="text-white text-lg font-semibold">
              About the Dealer
            </h3>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>ABC Auto Sales</p>
              <p>123 Main Street, Anytown USA</p>
              <p>Phone: (555) 555-5555</p>
              <p>Email: info@abcauto.com</p>
              <p>
                ABC Auto Sales has been serving the community for over 20 years.
                We pride ourselves on our excellent customer service and wide
                selection of quality vehicles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
