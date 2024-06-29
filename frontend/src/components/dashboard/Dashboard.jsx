/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Yvks5f88XYb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// import { Users } from "./Users";
import { UsersTable } from "./UsersTable";

export function Dashboard() {
  return (
    <div className="md:px-14 px-12 flex min-h-screen w-full flex-col bg-muted/40">
      <main>
        <div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Tus Espacios</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Aca puedes ingresar nuevos vehiculos y ver los que ya tienes.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Nuevo Vehiculo</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Espacios Ocupados</CardDescription>
                <CardTitle className="text-4xl">56</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% desde la semana pasado
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Espacios Desocupados</CardDescription>
                <CardTitle className="text-4xl">54</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% desde la semana pasada
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <UsersTable />
        </div>
      </main>
    </div>
  );
}
