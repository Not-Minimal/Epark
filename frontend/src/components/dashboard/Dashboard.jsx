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
import { UsersTable } from "./UsersTable";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
      <main>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2">
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
          <Card>
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
          <Card>
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
        <div className="mt-4">
          <UsersTable />
        </div>
      </main>
    </div>
  );
}
