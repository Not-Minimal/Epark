import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { QrCodeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/Qr/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/Qr/viewQrCode">
                Ver codigo QR
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <div className="bg-card rounded-xl shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="bg-muted rounded-full p-4">
                <QrCodeIcon className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Escanear nuevo usuario</h2>
              <div className="bg-muted rounded-xl p-6 w-full">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Apunta la cámara de tu dispositivo hacia el código QR para
                      escanear al nuevo usuario.
                    </p>
                  </div>
                  <div className="bg-background border-2 border-muted rounded-xl p-8 w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <QrCodeIcon className="h-20 w-20 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Ingresar manualmente
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
