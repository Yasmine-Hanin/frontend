import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Context/MapContext";
import OverviewMap from "ol/control/OverviewMap";
import { OSM, TileJSON } from "ol/source";
import { Tile } from "ol/layer";
import "./css/OverviewMapControls.css";
import { CurrentBseLayerContext } from "../Context/CurrentBseLayerContext";
const OverviewMapControls = () => {
  const { map } = useContext(MapContext);
  const { currentBseLayer, setCurrentBseLayer } = useContext(
    CurrentBseLayerContext
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!map) return;

    // Create the OverviewMap control
    const overviewMapControl = new OverviewMap({
      className: "ol-overviewmap ol-custom-overviewmap",
      collapseLabel: "\u00BB",
      label: "\u00AB",
      collapsed: true,
      target: document.getElementById("overviewmap"),
      tipLabel: "Overview map",
    });

    // Add controls to the map
    map.controls.push(overviewMapControl);

    // Create image elements for the layers
    const osmImage = document.createElement("img");
    osmImage.src =
      "https://mapstore.geosolutionsgroup.com/mapstore/dist/web/client/plugins/background/assets/img/mapnik.jpg";
    osmImage.alt = "OpenStreetMap";
    osmImage.title = "OpenStreetMap";
    osmImage.addEventListener("click", () => setCurrentBseLayer("osm"));

    const satelliteImage = document.createElement("img");
    satelliteImage.src =
      "https://mapstore.geosolutionsgroup.com/mapstore/dist/web/client/plugins/background/assets/img/s2cloudless.jpg";
    satelliteImage.alt = "Satellite";
    satelliteImage.title = "Satellite";
    satelliteImage.addEventListener("click", () =>
      setCurrentBseLayer("satellite")
    );
    // Add images to the control
    const imagesDiv = overviewMapControl.getOverviewMap().get("target");
    if (imagesDiv) {
      imagesDiv.innerHTML = "";
      imagesDiv.appendChild(osmImage);
      imagesDiv.appendChild(satelliteImage);
    }

    const backgroundSelectorButton = document.querySelector(
      "#overviewmap > div > button "
    );
    backgroundSelectorButton.classList = "backgroundSelector";

    const span = document.querySelector("#overviewmap > div > button > span ");
    backgroundSelectorButton.removeChild(span);

    // const label = document.createElement("div");
    // label.classList = "background-preview-button-label";
    // backgroundSelectorButton.appendChild(label);
    // const labelContent = document.createElement("div");
    // labelContent.classList = "bg-body";
    // label.appendChild(labelContent);

    if (currentBseLayer === "osm") {
      backgroundSelectorButton.appendChild(osmImage);
      //labelContent.innerHTML = "Open Street Map";
    } else {
      backgroundSelectorButton.appendChild(satelliteImage);
      //labelContent.innerHTML = "Satellite";
    }

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(overviewMapControl);
    };
  }, [map, currentBseLayer]);

  return <div id="overviewmap"></div>;
};

export default OverviewMapControls;
