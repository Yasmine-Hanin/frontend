import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const UseFetch = (url, selectedOption) => {
  const [wmsLayers, setWmsLayers] = useState([]);
  const { inputText, setInputText } = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const layerNodes = xmlDoc.getElementsByTagName("Layer");
        const layers = [];
        const Keywords = [];
        // Parse WMS layer information and add to layers array
        for (let i = 0; i < layerNodes.length; i++) {
          const layerNode = layerNodes[i];
          const name = layerNode.getElementsByTagName("Name")[0].textContent;
          const title = layerNode.getElementsByTagName("Title")[0].textContent;
          const abstract =
            layerNode.getElementsByTagName("Abstract")[0].textContent;
          const keywordNodes = layerNode.getElementsByTagName("Keyword");
          for (let i = 0; i < keywordNodes.length; i++) {
            if (keywordNodes[i].textContent === selectedOption) {
              Keywords.push(keywordNodes[i].textContent);
            }
          }
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

          if (Keywords.includes(selectedOption)) {
            layers.push({
              name,
              title,
              abstract,
              Keywords,
              extent: [minX, minY, maxX, maxY],
            });
          }
        }

        // Update state with WMS layers information
        setWmsLayers(layers);
      })
      .catch((error) => console.error(error));
  }, [selectedOption]);
  return { wmsLayers };
};

export default UseFetch;
