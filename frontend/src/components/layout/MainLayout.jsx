import { Outlet } from "react-router-dom";
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
  return (
    <div className="bg-stone-50">
      <Navbar />
      <main className="sm:px-16 px-4 sm:ml-4 pt-4">
        <h1 className="text-4xl mb-4 text-gray-700">
          Hola, {userProfile.username} 👋🏻
        </h1>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
