import React, { useContext, useEffect, useState } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../Context/MapContext";
const FullScreenControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    //This means that if the map variable is falsy, the function will immediately exit and return undefined.
    if (!map) return;

    //The FullScreen control is a built-in control in the OpenLayers mapping library that provides a button to toggle the map between full-screen mode and normal mode.
    let fullScreenControl = new FullScreen({});

    // Add the `FullScreen` control to the map's controls array
    map.controls.push(fullScreenControl);

    // Return a cleanup function that removes the `FullScreen` control from the map's controls array
    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  // Return `null` since the component doesn't render anything
  return null;
};
export default FullScreenControl;
