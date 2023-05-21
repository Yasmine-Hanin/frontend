import React, { useContext, useEffect, useRef } from "react";
import MapContext from "../Context/MapContext";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import { LayerSwitcherImage } from "ol-ext/control/LayerSwitcherImage";
const LayerSwitcherControls = () => {
  const { map } = useContext(MapContext);
  const layerSwitcherRef = useRef(null);
  useEffect(() => {
    //This means that if the map variable is falsy, the function will immediately exit and return undefined.
    if (!map) return;

    layerSwitcherRef.current = new LayerSwitcher({
      show_progress: true,
      extent: true,
      trash: true,
      oninfo: function (l) {
        alert(l.get("title"));
      },
    });

    map.controls.push(layerSwitcherRef.current);

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
          if (rex.test(l.get("title").toLowerCase())) {
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

    // The serach input
    var search = document.createElement("input");
    search.setAttribute("placeholder", "filter");

    // Add an event listener to the search input field that listens for keyup events.
    search.addEventListener("keyup", () => {
      // Create a new regular expression using the value of the search input field.
      var rex = new RegExp(search.value);

      // Call the filterLayers function with the newly created regular expression and the layers array.
      filterLayers(rex, map.getLayers());
    });

    // Add an event listener to the search input field that listens for changes to its value.
    search.addEventListener("change", function () {
      var rex = new RegExp(search.value);
      filterLayers(rex, map.getLayers());
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
        if (rex.test(e.layer.get("title").toLowerCase())) {
          // If the layer's title matches the regular expression, show it in the layer switcher.
          e.li.style.display = "block";
        } else {
          // If the layer's title doesn't match the regular expression, hide it from the layer switcher.
          e.li.style.display = "none";
        }
      }
    });
    // Add search input in the switcher header
    layerSwitcherRef.current.setHeader(search);

    return () => map.controls.remove(layerSwitcherRef.current);
  }, [map]);

  return null;
};
export default LayerSwitcherControls;
