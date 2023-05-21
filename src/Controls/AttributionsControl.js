import { useContext, useEffect } from "react";
import MapContext from "../Context/MapContext";
import { Attribution } from "ol/control";

const AttributionsControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const target = document.querySelector("#footer-attribution-container");
    console.log(target);

    const attributionControl = new Attribution({
      collapsible: false,
      target: target,
    });

    console.log(attributionControl);

    map.controls.push(attributionControl);

    return () => {
      map.controls.remove(attributionControl);
    };
  }, [map]);

  return null;
};
export default AttributionsControl;
