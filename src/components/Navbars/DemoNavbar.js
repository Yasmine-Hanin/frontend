import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";

function Header(props) {
  // These hooks provide a way to manage state and interact with the DOM in a functional component

  // The useState hook is used to create state variables in a functional component
  const [isOpen, setIsOpen] = React.useState(false); // state variable to toggle the sidebar
  const [dropdownOpen, setDropdownOpen] = React.useState(false); // state variable to toggle dropdown menus
  const [color, setColor] = React.useState("transparent"); // state variable to set the color of the sidebar

  // The useRef hook is used to create a reference to a DOM element
  const sidebarToggle = React.useRef(); // reference to the sidebar toggle button element

  // The useLocation hook is used to get the current URL location in the browser
  const location = useLocation(); // hook to get the current URL location

  // This function toggles the isOpen state and changes the color based on its new value
  const toggle = () => {
    // If isOpen is true, set the color to transparent; otherwise, set it to dark
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    // Toggle the isOpen state by setting it to the opposite of its current value
    setIsOpen(!isOpen);
  };

  // This function toggles the dropdown menu open or closed
  const dropdownToggle = (e) => {
    // Toggle the dropdownOpen state by setting it to the opposite of its current value
    setDropdownOpen(!dropdownOpen);
  };

  // This function gets the name of the brand for the current page, based on the routes array
  const getBrand = () => {
    let brandName = "Geoportal"; // Default brand name, in case no route matches the current page
    routes.map((prop, key) => {
      // Check if the current page URL contains the route's layout and path
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // If a route matches the current page, set the brand name to that route's name
        brandName = prop.name;
      }
      return null;
    });
    // Return the brand name for the current page
    return brandName;
  };

  // This function toggles the navigation sidebar open or closed
  const openSidebar = () => {
    // Toggle the "nav-open" class on the document element to show/hide the sidebar
    document.documentElement.classList.toggle("nav-open");
    // Toggle the "toggled" class on the sidebar toggle button to change its appearance
    sidebarToggle.current.classList.toggle("toggled");
  };

  // This function updates the color state based on the window size and sidebar open state
  const updateColor = () => {
    // Check if the window width is less than 993 pixels and the sidebar is open
    if (window.innerWidth < 993 && isOpen) {
      // Set the color state to "dark" if the above conditions are met
      setColor("dark");
    } else {
      // Set the color state to "transparent" if the above conditions are not met
      setColor("transparent");
    }
  };

  // This effect sets up a listener to update the color state when the window is resized
  React.useEffect(() => {
    // Add a listener for the "resize" event on the window object
    // and bind the "updateColor" function to the current context
    window.addEventListener("resize", updateColor.bind(this));
  });

  // This effect checks the window width and sidebar state, and toggles the sidebar if necessary
  React.useEffect(() => {
    // If the window width is less than 993 pixels and the "nav-open" class is present on the document element,
    // remove the "nav-open" class from the document element and toggle the "toggled" class on the sidebarToggle ref
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    // This component is a Bootstrap Navbar with dynamic color and class settings
    <Navbar
      // The color prop is set based on the current pathname, with "dark" used for the "full-screen-maps" page and the color state used otherwise
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      // The expand prop is set to "lg" to indicate that the Navbar should collapse on smaller screens
      expand="lg"
      // The className prop is set based on the current pathname and color state, with additional classes added if the color is "transparent"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          {/* The NavbarBrand component from the reactstrap library is used tocreate a link to the home page of the website */}
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        {/* NavbarToggler is a component from the reactstrap library used to toggle the visibility of the navigation menu in a Navbar component. */}
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        {/* Collapse is a component from the reactstrap library used to create a collapsible content area in a web page. */}
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-bell-55" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Action</DropdownItem>
                <DropdownItem tag="a">Another Action</DropdownItem>
                <DropdownItem tag="a">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
