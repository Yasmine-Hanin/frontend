import { useContext, useEffect } from "react";
import MapContext from "../../Context/MapContext";
import OLVectorLayer from "ol/layer/Vector";
const VectorLayer = ({ source, style, zIndex, title }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      title,
      source,
      style,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default VectorLayer;
