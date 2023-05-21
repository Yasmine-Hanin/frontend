import React, { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import ZoomToExtent from "ol/control/ZoomToExtent";

const ZoomToExtentControls = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // Create ScaleLine  control
    const zoomToExtentControl = new ZoomToExtent();

    // Add controls to the map
    map.controls.push(zoomToExtentControl);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(zoomToExtentControl);
    };
  }, [map]);

  return null;
};

export default ZoomToExtentControls;
