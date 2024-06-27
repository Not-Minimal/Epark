import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth.service.js";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
  const userRole = storedUser?.data?.rolName;
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

  return (
    <header className="flex h-16 w-full items-center justify-between bg-gray-900 px-4 md:px-6">
      <NavLink
        to="/"
        className="flex items-center gap-2 text-lg font-semibold text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M9 9a3 3 0 1 1 6 0"></path>
          <path d="M12 12v3"></path>
          <path d="M11 15h2"></path>
          <path d="M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3"></path>
          <path d="M12 19v3"></path>
        </svg>
        <span className="sr-only">Parking Dashboard</span>E-Park
      </NavLink>
      <nav className="flex gap-6 text-sm font-medium text-gray-400 md:flex">
        <NavLink
          to="/home"
          className={`inline-flex h-8 items-center justify-center rounded-md px-4 transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none ${location.pathname === "/inicio" ? "text-white" : ""}`}
        >
          Inicio
        </NavLink>
        {userRole === "administrador" && (
          <NavLink
            to="/users"
            className={`inline-flex h-8 items-center justify-center rounded-md px-4 transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none ${location.pathname === "/usuarios" ? "text-white" : ""}`}
          >
            Usuarios
          </NavLink>
        )}
        <NavLink
          to="/profile"
          className={`inline-flex h-8 items-center justify-center rounded-md px-4 transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none ${location.pathname === "/perfil" ? "text-white" : ""}`}
        >
          Perfil
        </NavLink>
        <NavLink
          to="/"
          onClick={logoutSubmit}
          className={`inline-flex h-8 items-center justify-center rounded-md px-4 transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none ${location.pathname === "/" ? "text-white" : ""}`}
        >
          Cerrar
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
