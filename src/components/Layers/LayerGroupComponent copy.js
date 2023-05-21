import { useContext, useEffect, useState } from "react";
import MapContext from "../../Context/MapContext";
import LayerGroup from "ol/layer/Group";
import LayerGroupContext from "../../Context/LayerGroupContext";

const LayerGroupComponent = ({ title, children }) => {
  const { map } = useContext(MapContext);
  const [group, setGroup] = useState(null);

  let layerGroup = new LayerGroup({
    title: title,
    layers: [],
  });
  useEffect(() => {
    if (!map || !group) return;

    map.addLayer(layerGroup);

    setGroup(layerGroup);

    return () => {
      if (map) {
        map.removeLayer(layerGroup);
      }
    };
  }, [map, group]);

  return (
    <LayerGroupContext.Provider value={{ group }}>
      {children}
    </LayerGroupContext.Provider>
  );
};

export default LayerGroupComponent;
