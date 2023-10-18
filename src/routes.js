import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Inventories from "views/admin/inventories"; 
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";


// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
  MdInventory2,
} from "react-icons/md";

const routes = [
  {
    name: "Main",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Inventories",
    layout: "/admin",
    path: "inventories",
    icon: <MdInventory2 className="h-6 w-6" />,
    component: <Inventories />,
    secondary: true,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  
];
export default routes;
