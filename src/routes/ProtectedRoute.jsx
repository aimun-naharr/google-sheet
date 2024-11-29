import { Navigate, Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="grid grid-cols-12 gap-8 ">
      <div className="col-span-3 h-screen ">
        <Sidebar />
      </div>
      <div className="col-span-9 px-10 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
export default ProtectedRoute;
