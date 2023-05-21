import React, { useContext, useEffect, useRef } from "react";
import MapContext from "../Context/MapContext";
import LayerSwitcherImage from "ol-ext/control/LayerSwitcherImage";

const LayerSwitcherImgControls = () => {
  const { map } = useContext(MapContext);
  const layerSwitcherImgRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    layerSwitcherImgRef.current = new LayerSwitcherImage();

    map.controls.push(layerSwitcherImgRef.current);

    return () => {
      map.controls.remove(layerSwitcherImgRef.current);
    };
  }, [map]);

  return null;
};
export default LayerSwitcherImgControls;
