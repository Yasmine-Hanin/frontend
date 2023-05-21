import { useContext, useEffect } from "react";
import MapContext from "../../Context/MapContext";
import OLTileLayer from "ol/layer/Tile";
import LayerGroupContext from "../../Context/LayerGroupContext";
const TileLayer = ({ source, zIndex = 0, title }) => {
  const { map } = useContext(MapContext);
  const { group } = useContext(LayerGroupContext);
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      title,
      source,
      zIndex,
    });
    //map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    if (group) {
      group.getLayers().push(tileLayer);
    }

    return () => {
      if (group) {
        //map.removeLayer(tileLayer);
        group.getLayers().pop(tileLayer);
      }
    };
  }, [map, group, source, title, zIndex]);
  return null;
};
export default TileLayer;
