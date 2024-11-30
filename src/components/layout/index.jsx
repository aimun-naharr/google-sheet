import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
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

export default AppLayout;
