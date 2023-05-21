import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Context/MapContext";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import "../components/Layers/map.css";
import { toStringHDMS } from "ol/coordinate";

const MousePositionControl = () => {
  const { map } = useContext(MapContext);
  const [showMousePosition, setShowMousePosition] = useState(true);

  useEffect(() => {
    if (!map) return;

    const target = document.querySelector("#footer-mousePosition-container");
    console.log(target);

    const coordinateFormat = (coordinate) => {
      const [lon, lat] = coordinate;
      const formattedLat = formatCoordinate(lat, "NS");
      const formattedLon = formatCoordinate(lon, "EW");
      return `Lat: ${formattedLat} Long: ${formattedLon}`;
    };

    const formatCoordinate = (coordinateValue, direction) => {
      const absolute = Math.abs(coordinateValue);
      const degrees = Math.floor(absolute);
      const minutes = Math.floor((absolute - degrees) * 60);
      const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2);
      const directionLabel = coordinateValue >= 0 ? direction[0] : direction[1];
      return `${degrees}° ${minutes}' ${seconds}" ${directionLabel}`;
    };

    // Create MousePosition control
    const mousePositionControl = new MousePosition({
      target: target,
      className: "mousePosition",
      projection: "EPSG:4326",
      undefinedHTML: `Lat: 00° 00' 00.00'' Long: 00° 00' 00.00''`,
      coordinateFormat: coordinateFormat,
    });

    const button = document.getElementById("showCoord");
    button.onclick = () => {
      setShowMousePosition((prevShowMousePosition) => !prevShowMousePosition);
    };
    document
      .querySelector("#footer-mousePosition-container")
      .appendChild(button);

    // Add or remove the MousePosition control based on the showMousePosition state
    if (showMousePosition) {
      map.controls.push(mousePositionControl);
    } else {
      map.controls.remove(mousePositionControl);
    }

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(mousePositionControl);
    };
  }, [map, showMousePosition]);

  return null;
};

export default MousePositionControl;
