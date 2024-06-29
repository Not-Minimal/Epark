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

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicle"
        element={
          <ProtectedRoute>
            <Vehicle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parking-spots"
        element={
          <ProtectedRoute>
            <ParkingSpots />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
