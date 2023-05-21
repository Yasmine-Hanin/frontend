import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Context/MapContext";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import "../components/Layers/map.css";
import Bar from "ol-ext/control/Bar";
import { FullScreen, Rotate, Zoom, ZoomToExtent } from "ol/control";
import Toggle from "ol-ext/control/Toggle";
import Select from "ol/interaction/Select";
import Draw from "ol/interaction/Draw";
import "./css/BarControl.css";
import { Vector } from "ol/source";

const BarControl = () => {
  const { map } = useContext(MapContext);
  const [source, setSource] = useState("");

  useEffect(() => {
    if (!map) return;

    // Create Zoom control
    const barControl = new Bar();

    // Add controls to the map
    map.controls.push(barControl);
    var nested = new Bar({ toggleOne: true, group: true });
    //barControl.addControl(nested);
    barControl.addControl(new ZoomToExtent());
    barControl.addControl(new FullScreen());
    barControl.addControl(new Zoom());

    const fitExtentButtons = document.querySelector(
      "div.ol-zoom-extent.ol-unselectable.ol-control > button"
    );
    fitExtentButtons.innerHTML = "";
    // Create a new <i> element for the FontAwesome icon
    const iconElement = document.createElement("i");
    iconElement.classList.add("fas", "fa-expand");

    // Append the icon element as a child of the existing element
    fitExtentButtons.appendChild(iconElement);

    const fullScreenButtons = document.querySelector(
      "div.ol-full-screen.ol-unselectable.ol-control > button"
    );
    fullScreenButtons.innerHTML = "";
    // Create a new <i> element for the FontAwesome icon
    const iconFullElement = document.createElement("i");
    iconFullElement.classList.add("fas", "fa-arrows-alt");

    // Append the icon element as a child of the existing element
    fullScreenButtons.appendChild(iconFullElement);

    function info(message) {
      document.getElementById("info").innerHTML = message;
    }

    const selectCtrl = new Toggle({
      html: '<i class="fa fa-hand-pointer-o"></i>',
      className: "select",
      title: "Select",
      interaction: new Select(),
      active: true,
      onToggle: (isActive) => {
        info(`Select is ${isActive ? "activated" : "deactivated"}`);
      },
    });
    //nested.addControl(selectCtrl);

    map
      .getLayerGroup()
      .get("layers")
      .forEach(function (layer) {
        if (layer.get("title") === "Vector Layer") {
          setSource(layer);
        }
      });
    if (source) {
      //console.log(source.getSource());
    }

    // Add editing tools
    const pedit = new Toggle({
      html: '<span><i class="fa fa-map-marker" ></i></span>',
      className: "edit",
      title: "Point",
      interaction: new Draw({
        type: "Point",
        source: source,
      }),
      onToggle: (isActive) => {
        info(`Edition is ${isActive ? "activated" : "deactivated"}`);
      },
    });
    //nested.addControl(pedit);

    // Remove controls when the component unmounts
    return () => {
      map.controls.remove(barControl);
    };
  }, [map]);

  return <div id="info"></div>;
};

export default BarControl;
