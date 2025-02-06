import { Outlet } from "react-router-dom";
import AdminNav from "./adminComponent/AdminNav";
import AdminSidebar from "./adminComponent/AdminSidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar className="h-full" />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;