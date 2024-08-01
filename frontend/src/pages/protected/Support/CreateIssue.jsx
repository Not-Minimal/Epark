import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { createIssue } from "@/services/issue.service";

export default function CreateIssue() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(""); // Estado para almacenar el ID de usuario

  const registerIssue = (data) => {
    createIssue(userId, data) // Usa userId en lugar de un ID fijo
      .then(() => {
        navigate("/support/dashboard");
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
    };

    registerIssue(data);
  };

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
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="userId">ID de Usuario</Label>
                  <Input
                    id="userId"
                    name="userId"
                    placeholder="Ingrese el ID del usuario"
                    value={userId} // Vincula el valor al estado userId
                    onChange={(e) => setUserId(e.target.value)} // Actualiza el estado cuando el usuario escribe
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Titulo</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ingrese un titulo"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripcion</Label>
                  <Textarea
                    id="description"
                    name="description"
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
