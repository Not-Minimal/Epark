import { profile } from "@/services/auth.service";
import { updateUser } from "@/services/user.service";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import profileImage from "@/assets/png/avatar.png";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    rut: "",
    celular: "",
    rolName: "",
    tipoUsuario: "",
  });

  const [formState, setFormState] = useState({
    username: "",
    celular: "",
    tipoUsuario: "",
  });

  const dataProfile = async () => {
    try {
      const { data } = await profile();
      setUserProfile(data);
      setFormState({
        username: data.username,
        celular: data.celular,
        tipoUsuario: data.tipoUsuario,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    dataProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUser(formState, userProfile.rut);
      // Vuelve a obtener el perfil actualizado de la base de datos
      await dataProfile();
      toast({
        title: "Perfil actualizado",
        description: "En tu próximo inicio de sesión verás los cambios.",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert(
        "Hubo un error al actualizar el perfil. Por favor, intenta de nuevo.",
      );
    }
  };

  const handleRefresh = async () => {
    await dataProfile();
  };

  return (
    <main className="profile_page flex-grow flex-col min-h-screen">
      <div className="sections  justify-center items-center flex min-h-full"></div>
      <div className="flex min-h-full items-center justify-center ">
        <div className="max-w-4xl w-full space-y-6 bg-gray-50 dark:bg-gray-800  rounded-lg">
          <Card className="py-4">
            <CardContent className="space-y-4">
              <Avatar className="w-12 h-12">
                <img
                  src={profileImage}
                  width="96"
                  height="96"
                  alt="Avatar"
                  className="rounded-full"
                />
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {userProfile.rolName.toUpperCase()}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" value={userProfile.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rut">Rut</Label>
                <Input id="rut" value={userProfile.rut} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" value={userProfile.celular} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Tipo Usuario</Label>
                <Input
                  id="tipoUsuario"
                  value={userProfile.tipoUsuario}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Enter your bio"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button onClick={handleRefresh}>Refrescar</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Actualizar datos</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Actualizar datos</DialogTitle>
                    <DialogDescription>
                      Actualiza tus datos personales, solo puedes cambiar tu
                      nombre, número y tipo de usuario.
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
                          setFormState({
                            ...formState,
                            username: e.target.value,
                          })
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
                          setFormState({
                            ...formState,
                            celular: e.target.value,
                          })
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
                          <SelectValue placeholder={userProfile.tipoUsuario} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Funcionario">
                            Funcionario
                          </SelectItem>
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Profile;
