// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { deleteUser, getUsers, updateUser } from "@/services/user.service";
import { Paperclip, Pencil, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input"; // Asegúrate de importar el componente Input
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { profile } from "@/services/auth.service";

export function UsersTable() {
  const [users, setUsers] = useState([]);
  const { toast } = useToast();
  const [editUser, setEditUser] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    rut: "",
    celular: "",
    rolName: "",
    tipoUsuario: "",
  });
  const [userProfile, setUserProfile] = useState({
    rolName: "",
  });

  const handleDelete = async (rut) => {
    try {
      await deleteUser(rut);
      setUsers(users.filter((user) => user.Rut !== rut));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(formState, editUser.Rut);
      setUsers(
        users.map((user) => (user.Rut === editUser.Rut ? formState : user)),
      );
      toast({
        title: "Usuario actualizado",
        description:
          "Los datos del usuario han sido actualizados correctamente.",
      });
      setEditUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      alert(
        "Hubo un error al actualizar el usuario. Por favor, intenta de nuevo.",
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        const formattedData = response.data.map((user) => ({
          Nombre: user.username,
          Rut: user.rut,
          Celular: user.celular,
          TipoUsuario: user.tipoUsuario,
          Correo: user.email,
          Rol: user.roles[0].name,
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    const fetchProfile = async () => {
      try {
        const { data } = await profile();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUsers();
    fetchProfile();
  }, []);

  const handleEditClick = (user) => {
    setEditUser(user);
    setFormState({
      username: user.Nombre,
      email: user.Correo,
      rut: user.Rut,
      celular: user.Celular,
      rolName: user.Rol,
      tipoUsuario: user.TipoUsuario,
    });
  };
  return (
    <>
      {userProfile.rolName === "administrador" && (
        <>
          <div className="">
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-6">
                    <CardTitle>Usuarios</CardTitle>
                    <CardDescription>
                      Este es un listado de los usuarios en el sistema, puedes
                      editar, descargar el certificado(Alumno regular o
                      Contrato) y ademas eliminarlos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Cedula
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Celular
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Correo
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Tipo Usuario
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Rol Usuario
                          </TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.Rut}>
                            <TableCell>{user.Nombre}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {user.Rut}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {user.Celular}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {user.Correo}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {user.TipoUsuario}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {user.Rol === "administrador" ? (
                                <Badge variant="primary">{user.Rol}</Badge>
                              ) : (
                                <Badge variant="secondary">{user.Rol}</Badge>
                              )}
                            </TableCell>
                            <TableCell align="end">
                              <div className="space-x-2 space-y-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEditClick(user)}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Editar</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Button variant="outline" size="icon">
                                        <Paperclip className="h-4 w-4 " />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Certificado</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Button
                                        className="bg-red-500"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(user.Rut)}
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {editUser && (
            <Dialog
              open={!!editUser}
              onOpenChange={(isOpen) => !isOpen && setEditUser(null)}
            >
              <DialogTrigger asChild>
                <Button variant="outline">Editar Usuario</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Actualizar datos</DialogTitle>
                  <DialogDescription>
                    Actualiza los datos del usuario seleccionado.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="username"
                      value={formState.username}
                      className="col-span-3"
                      onChange={(e) =>
                        setFormState({ ...formState, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="text" className="text-right">
                      Rut
                    </Label>
                    <Input
                      id="rut"
                      value={formState.rut}
                      className="col-span-3"
                      onChange={(e) =>
                        setFormState({ ...formState, rut: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mail" className="text-right">
                      Correo
                    </Label>
                    <Input
                      id="mail"
                      value={formState.email}
                      className="col-span-3"
                      onChange={(e) =>
                        setFormState({ ...formState, rut: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="celular" className="text-right">
                      Celular
                    </Label>
                    <Input
                      id="celular"
                      value={formState.celular}
                      className="col-span-3"
                      onChange={(e) =>
                        setFormState({ ...formState, celular: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipoUsuario" className="text-right">
                      Tipo Usuario
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormState({ ...formState, tipoUsuario: value })
                      }
                      value={formState.tipoUsuario}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Selecciona el tipo de usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Funcionario">Funcionario</SelectItem>
                        <SelectItem value="Estudiante">Estudiante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleUpdate}>
                    Actualizar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </>
  );
}
