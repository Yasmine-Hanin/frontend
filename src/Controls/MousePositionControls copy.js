import React, { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import "../components/Layers/map.css";
import { toStringHDMS } from "ol/coordinate";
const MousePositionControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const target = document.querySelector("#footer-mousePosition-container");
    console.log(target);

    const coordinateFormat = (coordinate) => {
      const [lon, lat] = coordinate;
      const formattedLat = formatCoordinate(lat, "NS");
      const formattedLon = formatCoordinate(lon, "EW");
      return `Lat: ${formattedLat} Lng: ${formattedLon}`;
    };

    const formatCoordinate = (coordinateValue, direction) => {
      const absolute = Math.abs(coordinateValue);
      const degrees = Math.floor(absolute);
      const minutes = Math.floor((absolute - degrees) * 60);
      const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2);
      const directionLabel = coordinateValue >= 0 ? direction[0] : direction[1];
      return `${degrees}° ${minutes}' ${seconds}" ${directionLabel}`;
    };

    // Create Zoom control
    const mousePositionControl = new MousePosition({
      target: target,
      className: "mousePosition",
      projection: "EPSG:4326",
      coordinateFormat: coordinateFormat,
    });

    // Add controls to the map
    map.controls.push(mousePositionControl);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(mousePositionControl);
    };
  }, [map]);

  return null;
};

export default MousePositionControl;
