import React, { useContext, useEffect, useRef } from "react";
import Overlay from "ol/Overlay";
import MapContext from "../Context/MapContext";
import { toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import "./Popup.css";

const PopupOverlay = () => {
  const { map } = useContext(MapContext);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const closerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const closer = closerRef.current;

    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    closer.addEventListener("click", () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    });

    if (!map.getOverlays()) {
      map.setOverlays([]);
    }
    map.getOverlays().push(overlay);

    // map.on("singleclick", (event) => {
    //   const coordinate = event.coordinate;
    //   const lonLat = toLonLat(coordinate);
    //   const hdms = toStringHDMS(lonLat);
    //   content.innerHTML = `<p>You clicked here:</p><code>${hdms}</code>`;
    //   overlay.setPosition(coordinate);
    // });

    map.on("singleclick", function (evt) {
      var viewResolution = map.getView().getResolution();
      //console.log(map.getLayers());
      if (map.getLayers().getArray()[4] !== undefined) {
        var source = map.getLayers().getArray()[4].getSource();
        var viewProjection = map.getView().getProjection();
        var url = source.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          viewProjection,
          { INFO_FORMAT: "application/json" }
        );
        if (url) {
          // Send the URL to the server and display the result in a popup
          // Send a GET request to the URL
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const STATE_NAME = data.features[0].properties.STATE_NAME;
              const PERSONS = data.features[0].properties.PERSONS;
              content.innerHTML = `<p>State Name :</p><code>${STATE_NAME}</code><br/><p>Population :</p><code>${PERSONS}</code>`;
              overlay.setPosition(evt.coordinate);
            })
            .catch((error) => console.error(error));
        }
      } else {
        console.log("getArray()[4] is undefined");
      }
    });

    return () => map.getOverlays().remove(overlay);
  }, [map]);

  return (
    <>
      <div ref={containerRef} id="popup" className="ol-popup">
        <a
          ref={closerRef}
          href="#"
          id="popup-closer"
          className="ol-popup-closer"
        ></a>
        <div ref={contentRef} id="popup-content"></div>
      </div>
    </>
  );
};

export default PopupOverlay;
