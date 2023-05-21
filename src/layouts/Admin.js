import React, { useState } from "react";
// javascript plugin used to create scrollbars on windows
/*
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Login from "components/FixedPlugin/login";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
*/
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import { SelectedValueProvider } from "../Context/SelectedValueContext";
import Map1 from "../components/Map/Map";
import { fromLonLat } from "ol/proj";
import LayerGroupComponent from "../components/Layers/LayerGroupComponent";
import { SelectedLayerNameProvider } from "../Context/SelectedLayerName";
import ErrorBoundary from "../Error/ErrorBoundary";
import { CurrentBseLayerProvider } from "Context/CurrentBseLayerContext";
import Footer from "components/Footer/Footer";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  const [center, setCenter] = useState([-5.818732, 35.785589]);
  const [zoom, setZoom] = useState(9);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <>
      <ErrorBoundary>
        <Map1 center={fromLonLat(center)} zoom={zoom}>
          <SelectedValueProvider>
            <SelectedLayerNameProvider>
              <CurrentBseLayerProvider>
                <div className="wrapper">
                  <Sidebar
                    {...props}
                    routes={routes}
                    bgColor={backgroundColor}
                    activeColor={activeColor}
                  />
                  <div className="main-panel" ref={mainPanel}>
                    {/*Header
        <DemoNavbar {...props} />*/}
                    <Switch>
                      {routes.map((prop, key) => {
                        return (
                          <Route
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                          />
                        );
                      })}
                    </Switch>
                    <Footer fluid />
                  </div>
                  {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> 
      <Login
        style={{ marginTop: "50px" }}
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />*/}
                </div>
              </CurrentBseLayerProvider>
            </SelectedLayerNameProvider>
          </SelectedValueProvider>
        </Map1>
      </ErrorBoundary>
    </>
  );
}

export default Dashboard;
