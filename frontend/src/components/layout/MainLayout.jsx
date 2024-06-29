import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="sm:px-16 p-4 sm:ml-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
