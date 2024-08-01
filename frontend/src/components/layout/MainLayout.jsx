import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { profile } from "@/services/auth.service";
import { useEffect } from "react";
import { useState } from "react";

const MainLayout = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
  });

  const dataProfile = async () => {
    try {
      const { data } = await profile();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    dataProfile();
  }, []);

  const location = useLocation();

  const getMessageForRoute = (path) => {
    switch (path) {
      case "/home":
        return `Bienvenido, ${userProfile.username} 👋🏻`;
      case "/users":
        return "Gestión de usuarios";
      case "/profile":
        return "Tu perfil";
      case "/qr/dashboard":
        return "Escanear código QR";
      case "/parking-spots":
        return "Gestión de estacionamientos";
      case "/vehicle/dashboard":
        return "Gestion vehiculos";
      case "/settings":
        return "Ajustes";
      default:
        return `Hola, ${userProfile.username} 👋🏻`;
    }
  };

  const message = getMessageForRoute(location.pathname);

  return (
    <div className="bg-stone-50">
      <Navbar />
      <main className="sm:px-16 px-4 sm:ml-4 pt-4">
        <h1 className="text-4xl mb-4 text-gray-700 font-bold">{message}</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
