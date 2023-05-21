import React, { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import ZoomSlider from "ol/control/ZoomSlider";

const ZoomSliderControls = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // Create ScaleLine  control
    const zoomSliderControl = new ZoomSlider();

    // Add controls to the map
    map.controls.push(zoomSliderControl);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(zoomSliderControl);
    };
  }, [map]);

  return null;
};

export default ZoomSliderControls;
