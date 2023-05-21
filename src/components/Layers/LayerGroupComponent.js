import { useContext, useEffect, useState } from "react";
import MapContext from "../../Context/MapContext";
import LayerGroup from "ol/layer/Group";
import LayerGroupContext from "../../Context/LayerGroupContext";

const LayerGroupComponent = ({ title, children }) => {
  const { map } = useContext(MapContext);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (map && !group) {
      const layerGroup = new LayerGroup({
        title: title,
        layers: [],
      });
      map.addLayer(layerGroup);
      setGroup(layerGroup);
    }

    return () => {
      if (map && group) {
        map.removeLayer(group);
      }
    };
  }, [map, group, title]);

  return (
    <LayerGroupContext.Provider value={{ group, setGroup }}>
      {children}
    </LayerGroupContext.Provider>
  );
};

export default LayerGroupComponent;
