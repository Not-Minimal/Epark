import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth.service.js";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import profileImage from "@/assets/png/avatar.png";

import {
  Car,
  LayoutDashboard,
  PanelsTopLeft,
  ParkingSquare,
  Settings,
  User,
  Users,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const logoutSubmit = () => {
    try {
      logout();
      toast({
        title: "Cerraste sesión correctamente",
      });
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-4 px-2.5 text-xl bg-gray-50 py-4 rounded-lg"
      : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex ">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              to="/home"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <ParkingSquare className="h-4 w-4 transition-all group-hover:scale-150" />
              <span className="sr-only">Epark</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/users"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Usuarios</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Usuarios</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/vehicle"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <Car className="h-5 w-5" />
                  <span className="sr-only">Vehiculos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Vehiculos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/parking-spots"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ParkingSquare className="h-5 w-5" />
                  <span className="sr-only">Estacionamientos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Estacionamientos</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={profileImage}
                    width="96"
                    height="96"
                    alt="Avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <NavLink to="/profile">Mi Perfil</NavLink>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <NavLink to="/settings">Ajustes</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink to="/" onClick={logoutSubmit}>
                    Cerrar Sesión
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelsTopLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <NavLink
                  href="/home"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <ParkingSquare className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                <NavLink
                  to="/home"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/users"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <Users className="h-5 w-5" />
                  Usuarios
                </NavLink>
                <NavLink
                  to="/vehicle"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <Car className="h-5 w-5" />
                  Vehiculos
                </NavLink>
                <NavLink
                  to="/parking-spots"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <ParkingSquare className="h-5 w-5" />
                  Estacionamientos
                </NavLink>
                <NavLink
                  to="/settings"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <Settings className="h-5 w-5" />
                  Ajustes
                </NavLink>
                <NavLink
                  to="/profile"
                  className={getNavLinkClass}
                  prefetch={false}
                >
                  <User className="h-5 w-5" />
                  Mi Perfil
                </NavLink>

                <Button className="bg-red-500">
                  <NavLink to="/" onClick={logoutSubmit}>
                    Cerrar Sesión
                  </NavLink>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="relative ml-auto flex-1 md:grow-0"></div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
