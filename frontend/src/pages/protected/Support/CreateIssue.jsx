import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function CreateIssue() {
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/support/createissue">
                Crear Reclamo
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="py-8 flex-1">
        <section className="p-4 sm:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Reclamo</CardTitle>
              <CardDescription>
                Completa los datos para crear un nuevo reclamo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titulo</Label>
                  <Input id="title" placeholder="Ingrese un titulo" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripcion</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe los detalles de tu reclamo"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="justify-self-end">
                  Crear Reclamo
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
