import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/joy/Button";
import axios from "axios";
import MapContext from "../../../Context/MapContext";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import LayerGroupContext from "../../../Context/LayerGroupContext";

const SearchButton = () => {
  const [showTable, setShowTable] = useState(false);
  const [wmsLayers, setWmsLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState("");
  const { map } = useContext(MapContext);
  const { group, setGroup } = useContext(LayerGroupContext);
  const handleClick = () => {
    setShowTable(true);
  };
  const handleLayerSelect = (layerName, selected) => {
    console.log("layername : " + layerName);
    setSelectedLayer(layerName);
    setWmsLayers((prevState) =>
      prevState.map((layer) => {
        if (layer.name === layerName) {
          return { ...layer, selected };
        }
        return layer;
      })
    );
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities"
      )
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const layerNodes = xmlDoc.getElementsByTagName("Layer");
        const layers = [];

        // Parse WMS layer information and add to layers array
        for (let i = 0; i < layerNodes.length; i++) {
          const layerNode = layerNodes[i];
          const name = layerNode.getElementsByTagName("Name")[0].textContent;
          const title = layerNode.getElementsByTagName("Title")[0].textContent;
          const abstract =
            layerNode.getElementsByTagName("Abstract")[0].textContent;
          const extent = layerNode.getElementsByTagName(
            "EX_GeographicBoundingBox"
          )[0];
          const minX = parseFloat(
            extent.getElementsByTagName("westBoundLongitude")[0].textContent
          );
          const minY = parseFloat(
            extent.getElementsByTagName("southBoundLatitude")[0].textContent
          );
          const maxX = parseFloat(
            extent.getElementsByTagName("eastBoundLongitude")[0].textContent
          );
          const maxY = parseFloat(
            extent.getElementsByTagName("northBoundLatitude")[0].textContent
          );

          layers.push({
            name,
            title,
            abstract,
            extent: [minX, minY, maxX, maxY],
          });
        }

        // Update state with WMS layers information
        setWmsLayers(layers);
      })
      .catch((error) => console.error(error));

    ////////////////////////////
  }, []);
  const onClick = () => {
    //const layers = map.get("layergroup").getLayersArray();
    //layers.forEach((layer) => console.log(layer.getProperties()));

    const name = selectedLayer.includes(":")
      ? selectedLayer.split(":")[1]
      : selectedLayer;
    const layer_wms = new ImageLayer({
      title: name,
      source: new ImageWMS({
        url: "http://localhost:8080/geoserver/wms",
        params: { LAYERS: name },
        ratio: 1,
        serverType: "geoserver",
      }),
    });
    //console.log("group : " + goup);
    let a = 1;
    if (group) {
      group.getLayers().push(layer_wms);
      setGroup(group);
      a = 0;
    }

    if (a == 0) {
      console.log(group.getKeys());
    } else {
      alert("filed");
    }
    // Use the forEach method to loop over the layers in the group
    group.getLayers().forEach(function (layer) {
      // Do something with the layer object
      console.log(layer.get("title"));
    });
    map.addLayer(layer_wms);
  };

  return (
    <div>
      <Button size="lg" sx={{ m: 2 }} onClick={handleClick}>
        Search
      </Button>
      {showTable && (
        <table style={{ width: "200px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Abstract</th>
            </tr>
          </thead>
          <tbody>
            {wmsLayers.map((layer) => (
              <tr key={layer.name}>
                <td>{layer.name}</td>
                <td>{layer.title}</td>
                <td>{layer.abstract}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={layer.selected}
                    onChange={(event) =>
                      handleLayerSelect(layer.name, event.target.checked)
                    }
                  />
                </td>
                <td id="wms_layers_window">
                  <button id="add_map_btn" onClick={onClick}>
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchButton;
