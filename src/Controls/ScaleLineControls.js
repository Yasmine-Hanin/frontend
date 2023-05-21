import React, { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import ScaleLine from "ol/control/ScaleLine";

const ScaleLineControls = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const target = document.querySelector("#footer-scaleLine-container");
    // Create ScaleLine  control
    const scaleLineControl = new ScaleLine({
      target: target,
    });

    // Add controls to the map
    map.controls.push(scaleLineControl);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(scaleLineControl);
    };
  }, [map]);

  return null;
};

export default ScaleLineControls;
