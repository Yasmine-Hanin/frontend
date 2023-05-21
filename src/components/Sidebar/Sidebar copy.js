import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../image/carte.png";

var ps;

function Sidebar(props) {
  //This code creates a reference to a DOM element using the useRef hook from the React library.
  const sidebar = React.useRef();

  // This function checks if the given routeName is active or not
  const activeRoute = (routeName) => {
    // Check if the routeName is present in the current location pathname
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // Use useEffect hook to initialize PerfectScrollbar on the sidebar node when the component mounts
  React.useEffect(() => {
    // Check if the current platform is Windows
    if (navigator.platform.indexOf("Win") > -1) {
      // If the platform is Windows, create a PerfectScrollbar instance with specific options and apply it to the sidebar node
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Return a cleanup function that removes the PerfectScrollbar instance if the platform is Windows
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
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
          <button
            id="drawer-menu-button"
            type="button"
            class="square-button ms-drawer-menu-button btn btn-primary"
          >
            Click Here
            <span class="glyphicon glyphicon-1-layer">::before</span>
          </button>
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
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
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
