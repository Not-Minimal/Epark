import { Routes, Route } from "react-router-dom";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/protected/Home";
import Profile from "./pages/protected/Profile";
import Error404 from "./pages/public/Error404";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Users from "./pages/protected/Users";
import Landing from "./pages/public/Landing";
import Vehicle from "./pages/protected/Vehicle";
import ParkingSpots from "./pages/protected/ParkingSpots";
import MainLayout from "./components/layout/MainLayout";
import Settings from "./pages/protected/Settings";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas con layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/parking-spots" element={<ParkingSpots />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default AppRouter;
