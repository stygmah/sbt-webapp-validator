import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  {
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/snippet",
    name: "Snippet",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
];

export default dashboardRoutes;
