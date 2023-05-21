//import Dashboard from "views/Dashboard.js";
//import Notifications from "views/Notifications.js";
//import Icons from "views/Icons.js";
//import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
//import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Profil from "views/Profil.js";
import Map2 from "views/Map2";
import Catalog from "views/Catalog/CatalogComponent/Catalog";
import OpenLayersMap from "views/OpenLayersMap";

var routes = [
  // {
  //   path: "/map2",
  //   name: "Map2",
  //   icon: "nc-icon nc-map-big",
  //   component: Map2,
  //   layout: "/admin",
  // },
  {
    path: "/map3",
    name: "OpenLayersMap",
    icon: "nc-icon nc-map-big",
    component: OpenLayersMap,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  {
    path: "/profil",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: Profil,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Users List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
  {
    path: "/upgrade",
    name: "Show Profile ",
    icon: "nc-icon nc-badge",
    component: UpgradeToPro,
    layout: "/admin",
  },
];
export default routes;
