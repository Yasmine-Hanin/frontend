// Import the necessary modules from the React and OpenLayers libraries.
import { useContext, useEffect } from "react";
import MapContext from "../../Context/MapContext";
import OLTileLayer from "ol/layer/Tile";
import LayerGroupContext from "../../Context/LayerGroupContext";

// Define a functional component called TileLayer that takes a source and a zIndex as props.
const TileLayer = ({ source, zIndex = 0, title }) => {
  // Get the map object from the MapContext using the useContext hook.
  const { map } = useContext(MapContext);
  const { group } = useContext(LayerGroupContext);
  // Add a side effect to create and add the OpenLayers TileLayer to the map when the component mounts.
  // Also, remove the layer from the map when the component unmounts.
  useEffect(() => {
    // If there is no map object, return early.
    if (!map) return;

    // Create an instance of the OpenLayers TileLayer with the given source and zIndex.
    let tileLayer = new OLTileLayer({
      title: title,
      source,
      zIndex,
    });

    //group.getLayers().push(tileLayer);
    console.log(group);
    //group.getLayers().push(tileLayer);
    // Add the layer to the map and set its zIndex.
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    // Return a cleanup function that removes the layer from the map when the component unmounts.
    return () => {
      if (map) {
        //group.getLayers().remove(tileLayer);
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  // Render null, since we don't need to render anything in the DOM for this component.
  return null;
};

// Export the TileLayer component as the default export of this module.
export default TileLayer;
