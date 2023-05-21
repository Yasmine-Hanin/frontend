import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Map } from "ol";
import View from "ol/View.js";
import { Group as LayerGroup, Tile, Image } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import MapContext from "../../Context/MapContext";
import { osm, vector, wms } from "../../Source";
import Stamen from "ol/source/Stamen.js";
import TileJSON from "ol/source/TileJSON.js";
import "./map.css";

const LayerSwitcherComponent = () => {
  const mapRef = useRef(null);
  const layerSwitcherRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      view: new View({
        center: [-645782.5026269718, 4266184.976760048],
        zoom: 4,
      }),
      layers: [
        new LayerGroup({
          title: "Stamen Map",
          layers: [
            new Tile({
              source: new Stamen({
                layer: "terrain",
              }),
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
      ],
    });

    layerSwitcherRef.current = new LayerSwitcher();

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
