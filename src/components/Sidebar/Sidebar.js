import React from "react";
import { NavLink } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { Button, Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import "./sidebar.css";
import logo from "../image/carte.png";
import "../../views/Catalog/Card/Card.css";
import "../../../src/assets/css/paper-dashboard.css";
import Catalog from "../../views/Catalog/CatalogComponent/Catalog";
import Search from "views/Catalog/CatalogComponent/Search";
import Auth from "./Authentication/Auth";
import CollapsePanel from "views/Catalog/CollapsePanel";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <>
      <div>
        <div
          className="sidebar"
          data-color={props.bgColor}
          data-active-color={props.activeColor}
        >
          {/* <div className="logo">
            <div className="simple-text logo-mini">
              <span className="logo-img">
                <img
                  src={logo}
                  alt="react-logo"
                  className="simple-text logo-mini"
                  style={{ width: 50 }}
                />
              </span>
              <span className="simple-text logo-normal">Geoportal</span>
            </div>
          </div> */}
          <div className="sidebar-wrapper" ref={sidebar}>
            <Nav>
              <Auth />
              {/*<Catalog />*/}
              <CollapsePanel />

              {props.routes.map((prop, key) => {
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} title={prop.name} />
                    </NavLink>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
