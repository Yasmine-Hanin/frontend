import { useContext, useEffect, useRef } from "react";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import MapContext from "../../Context/MapContext";
import LayerGroupContext from "../../Context/LayerGroupContext";

const ImageLayerComponent = ({ selectedLayer }) => {
  const { map } = useContext(MapContext);
  const { group } = useContext(LayerGroupContext);
  const prevLayerRef = useRef();
  const prevSelectedLayerRef = useRef();

  useEffect(() => {
    if (!map) return;

    const name = selectedLayer.includes(":")
      ? selectedLayer.split(":")[1]
      : selectedLayer;

    const layer = new ImageLayer({
      title: name,
      source: new ImageWMS({
        url: "http://localhost:8080/geoserver/wms",
        params: { LAYERS: name },
        ratio: 1,
        serverType: "geoserver",
      }),
    });
    if (layer) {
      const sourceExtent = layer.getSource();

      console.log(sourceExtent);
    }

    if (group) {
      if (prevLayerRef.current) {
        group.getLayers().push(prevLayerRef.current);
      }
      group.getLayers().push(layer);
      prevLayerRef.current = layer;
    }

    return () => {
      if (group) {
        group.getLayers().remove(layer);
      }
    };
  }, [map, group, selectedLayer]);

  useEffect(() => {
    prevSelectedLayerRef.current = selectedLayer;
  });

  const prevSelectedLayer = prevSelectedLayerRef.current;

  return null;
};

export default ImageLayerComponent;
