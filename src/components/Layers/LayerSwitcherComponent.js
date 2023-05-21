import React, { useRef, useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";
import { Map } from "ol";
import View from "ol/View.js";
import { Group as LayerGroup, Tile, Image } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import Stamen from "ol/source/Stamen.js";
import TileJSON from "ol/source/TileJSON.js";
import "./map.css";
import "../../css/ol-ext.css";
<script type="text/javascript" src="../../dist/ol-ext.js"></script>;

//LayerSwitcherComponent function: This is the main function that creates the map and the layer switcher control. It also sets the initial state for the filter and the layers.
const LayerSwitcherComponent = () => {
  const notificationAlert = React.useRef();
  //useRef: This hook is used to create a reference to the map container and the layer switcher control.
  const mapRef = useRef(null);
  const layerSwitcherRef = useRef(null);

  //useState: This hook is used to manage the filter state and the map state.
  const [map, setMap] = useState(null);

  //filterLayers: This function filters the layers based on the regular expression passed as an argument. It also hides the layer groups that have no visible layers.
  // Define a function called filterLayers that takes a regular expression (rex) and an array of layers as arguments.
  const filterLayers = (rex, layers) => {
    // Initialize a variable called found to false.
    let found = false;
    // Loop through each layer in the layers array.
    layers.forEach((l) => {
      // Check if the layer has sub-layers.
      if (l.getLayers) {
        // If the layer has sub-layers, recursively call the filterLayers function on the sub-layers.
        // If any sub-layer is found, set the "noLayer" property of the layer to false and set found to true.
        if (filterLayers(rex, l.getLayers().getArray())) {
          l.set("noLayer", false);
          found = true;
        } else {
          //If none of the sub-layers are found, set the "noLayer" property of the layer to true.
          l.set("noLayer", true);
        }
      } else {
        if (rex.test(l.get("title"))) {
          //If the layer's title matches the regular expression, set the layer's visibility to true and set found to true.
          l.setVisible(true);
          found = true;
        } else {
          // If the layer's title doesn't match the regular expression, set the layer's visibility to false.
          l.setVisible(false);
        }
      }
    });
    // Return the value of the found variable.
    return found;
  };

  // list of layers : This is an array of LayerGroup objects that contain the Tile layers that will be displayed on the map.
  const layers = [
    new LayerGroup({
      title: "Stamen Map",
      layers: [
        new Tile({
          source: new Stamen({
            layer: "terrain",
          }),
          visible: true,
          maxZoom: 7,
          title: "stamen Map Terrain",
        }),
        new Tile({
          title: "Stamen Toner",
          type: "base",
          visible: true,
          source: new XYZ({
            url: "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
          }),
        }),
        new Tile({
          title: "Stamen watercolor",
          type: "base",
          visible: true,
          source: new XYZ({
            url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
          }),
        }),
        new Tile({
          title: "terrain-background",
          type: "base",
          visible: true,
          source: new Stamen({
            layer: "terrain-background",
          }),
        }),
      ],
    }),
    new LayerGroup({
      title: "Base Layers",
      layers: [
        new Tile({
          title: "OpenStreetMap",
          type: "base",
          visible: true,
          source: new OSM(),
        }),
      ],
    }),
    new LayerGroup({
      title: "Satellite Map",
      layers: [
        new Tile({
          title: "Satellite",
          type: "base",
          visible: true,
          source: new TileJSON({
            attributions: "@MapTiler",
            url: "https://api.maptiler.com/maps/hybrid/tiles.json?key=wsI14ljTpD8P7mkLIkes",
          }),
        }),
      ],
    }),
  ];

  //useEffect: This hook is used to create the map, the layer switcher control, and the search input.
  //It also sets up event listeners for the search input and the layer switcher control.
  //Finally, it returns a cleanup function that removes the map and the layer switcher control when the component is unmounted.
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      view: new View({
        center: [-645782.5026269718, 4266184.976760048],
        zoom: 4,
      }),
      layers: layers,
    });

    function notify(place, msg) {
      var type = "primary";
      var options = {};
      options = {
        place: place,
        message: msg,
        type: type,
        icon: "nc-icon nc-alert-circle-i",
        autoDismiss: 7,
      };
      notificationAlert.current.notificationAlert(options);
    }

    //Create a Layer Switcher
    layerSwitcherRef.current = new LayerSwitcher({
      show_progress: true,
      extent: true,
      trash: true,
      oninfo: function (l) {
        notify("tc", l.get("title"));
      },
    });

    // The serach input
    var search = document.createElement("input");
    search.setAttribute("placeholder", "filter");

    // Add an event listener to the search input field that listens for keyup events.
    search.addEventListener("keyup", () => {
      // Create a new regular expression using the value of the search input field.
      var rex = new RegExp(search.value);

      // Call the filterLayers function with the newly created regular expression and the layers array.
      filterLayers(rex, layers);
    });

    // Add an event listener to the search input field that listens for changes to its value.
    search.addEventListener("change", function () {
      var rex = new RegExp(search.value);
      filterLayers(rex, layers);
    });

    // Add an event listener to the layerSwitcherRef that listens for a "drawlist" event.
    layerSwitcherRef.current.addEventListener("drawlist", (e) => {
      // Check if the layer has sub-layers and if it has a "noLayer" property set to true.
      if (e.layer.getLayers) {
        if (e.layer.get("noLayer")) {
          // Hide the layer group from the layer switcher.
          e.li.style.display = "none";
        } else {
          // Show the layer group in the layer switcher.
          e.li.style.display = "block";
        }
      } else {
        // If the layer doesn't have sub-layers, create a new regular expression using the value of the search input field.
        var rex = new RegExp(search.value);
        if (rex.test(e.layer.get("title"))) {
          // If the layer's title matches the regular expression, show it in the layer switcher.
          e.li.style.display = "block";
        } else {
          // If the layer's title doesn't match the regular expression, hide it from the layer switcher.
          e.li.style.display = "none";
        }
      }
    });

    //   const button = document.createElement("div");
    //   button.classList.add("toggleVisibility", "layerTrash");
    //   button.setAttribute("title", "show/hide");
    //   button.innerText = "X";

    //   button.addEventListener("click", function () {
    //     const layers = map.getLayers().getArray();
    //     const visible = !layers[0].getVisible();
    //     if (visible) {
    //       button.classList.remove("show");
    //     } else {
    //       button.classList.add("show");
    //     }
    //     for (let i = 0; i < layers.length; i++) {
    //       layers[i].setVisible(visible);
    //     }
    //   });
    //   e.li.querySelector("ol-layerswitcher-buttons").appendChild(button);
    // });

    // Add search input in the switcher header
    layerSwitcherRef.current.setHeader(search);

    // Add a layer switcher to the map
    map.addControl(layerSwitcherRef.current);

    return () => {
      map.setTarget(null);
      layerSwitcherRef.current.destroy();
    };
  }, []);

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <div ref={mapRef} className="map-container"></div>;
    </>
  );
};

LayerSwitcherComponent.propTypes = {};

export default LayerSwitcherComponent;
