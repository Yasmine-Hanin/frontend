import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Map } from "ol";
import { Group as LayerGroup, Tile, Image } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import MapContext from "../../Context/MapContext";
import { osm, vector, wms } from "../../Source";
import "ol-ext/dist/ol-ext.min.css";

const LayerSwitcherComponent = () => {
  const mapRef = useRef(null);
  const layerSwitcherRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new LayerGroup({
          title: "Base Layers",
          layers: [
            new Tile({
              title: "OpenStreetMap",
              type: "base",
              visible: true,
              source: new OSM(),
            }),
            new Tile({
              title: "Stamen Toner",
              type: "base",
              visible: true,
              source: new XYZ({
                url: "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
              }),
            }),
          ],
        }),
        new LayerGroup({
          title: "Overlays",
          layers: [
            new Image({
              title: "Satellite Imagery",
              visible: true,
              source: new XYZ({
                url: "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=<your-access-token>",
              }),
            }),
          ],
        }),
      ],
    });

    layerSwitcherRef.current = new LayerSwitcher({
      target: mapRef.current,
    });

    map.addControl(layerSwitcherRef.current);

    return () => {
      map.setTarget(null);
      layerSwitcherRef.current.destroy();
    };
  }, []);

  return <div ref={mapRef} className="map-container"></div>;
};

LayerSwitcherComponent.propTypes = {};

export default LayerSwitcherComponent;
