import React, { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import Zoom from "ol/control/Zoom";

const ZoomButtons = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // Create Zoom control
    const zoomControl = new Zoom();

    // Add controls to the map
    map.controls.push(zoomControl);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(zoomControl);
    };
  }, [map]);

  return null;
};

export default ZoomButtons;
