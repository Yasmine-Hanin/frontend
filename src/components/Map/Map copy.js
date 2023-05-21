import React, { useRef, useState, useEffect } from "react";
import "../../css/Map.css";
import MapContext from "../../Context/MapContext";
import * as ol from "ol";
import MapLoader from "views/Catalog/Map/MaplLoader";
import { unByKey } from "ol/Observable";

const Map1 = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (map) {
  //     const listenerKey = map.on("rendercomplete", () => {
  //       setIsLoading(false);
  //       unByKey(listenerKey);
  //     });
  //   }
  // }, [map]);

  // on component mount
  //This is a useEffect hook that runs only once on mount of the component.
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    //It initializes an OpenLayers map by creating a new instance of ol.Map with an empty array of layers, controls, and overlays
    let mapObject = new ol.Map(options);

    //setting the target property to the DOM node referenced by mapRef.
    mapObject.setTarget(mapRef.current);

    //The setMap function is called with the newly created mapObject to set the state of map to the initialized map.
    setMap(mapObject);

    //Finally, a function is returned that removes the target of the mapObject before unmounting the component.
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    // <div>
    //   {isLoading && <MapLoader />}

    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
    //</div>
  );
};
export default Map1;
