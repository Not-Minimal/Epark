import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  deleteIssue,
  getIssues,
  getIssuesByUser,
} from "@/services/issue.service";
import { Trash } from "lucide-react";
import { profile } from "@/services/auth.service";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [userProfile, setUserProfile] = useState({
    rolName: "",
    _id: "",
  });

  useEffect(() => {
    async function fetchProfileAndIssues() {
      try {
        // Fetch the user profile
        const profileResponse = await profile();
        setUserProfile(profileResponse.data);

        // Fetch the issues based on the user's role
        let issuesResponse;
        if (profileResponse.data.rolName === "usuario") {
          issuesResponse = await getIssuesByUser(profileResponse.data._id);
        } else if (profileResponse.data.rolName === "administrador") {
          issuesResponse = await getIssues();
        }

        setIssues(issuesResponse.data);
      } catch (error) {
        console.error("Error fetching issues or profile:", error);
      }
    }

    fetchProfileAndIssues();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteIssue(id);
      const response = await getIssues();
      setIssues(response.data);
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
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
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="py-8 flex-1">
        {userProfile.rolName === "usuario" && (
          <>
            <div>
              <div className="bg-white py-4 rounded-2xl max-w-4xl">
                <h1 className="text-3xl mb-8">Necesitas crear un Reclamo?</h1>
                <Link to="/support/createissue">
                  <Button>Crear Reclamo</Button>
                </Link>
              </div>
            </div>
          </>
        )}
        {userProfile.rolName === "administrador" && (
          <>
            <div>
              <h1 className="text-3xl py-8">Listado de Problemas Recientes</h1>
              <div className="bg-stone-50 p-4 rounded-2xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID Problema</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripcion</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue._id}>
                        <TableCell className="font-medium">
                          {issue._id}
                        </TableCell>
                        <TableCell>{issue.title}</TableCell>
                        <TableCell>{issue.description}</TableCell>
                        <TableCell align="end">
                          <div className="space-x-2 space-y-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    className="bg-red-500"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(issue._id)} // Asegúrate de usar _id si ese es el identificador correcto
                                  >
                                    <Trash className="h-4 w-4 text-white" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
