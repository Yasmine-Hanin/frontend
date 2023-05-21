import React, { useState } from "react";
import Map1 from "../components/Map/Map";
import Layers from "../components/Layers/Layers";
import TileLayer from "../components/Layers/TileLayer";
import VectorLayer from "../components/Layers/VectorLayer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { osm, vector } from "../Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Controls from "../Controls/Controls";
import MousePositionControl from "../Controls/MousePositionControls";
import FullScreenControl from "../Controls/FullScreenControl";
import ZoomControls from "../Controls/ZoomControls";
import ScaleLineControls from "../Controls/ScaleLineControls";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import "../components/Layers/map.css";
import ZoomSliderControls from "../Controls/ZoomSliderControls";
import "../css/Map.css";
import ZoomToExtentControls from "Controls/ZoomToExtentControl";
import OverviewMapControls from "Controls/OverviewMapControls";

let styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};
const geojsonObject = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        kind: "county",
        name: "Wyandotte",
        state: "KS",
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-94.8627, 39.202],
              [-94.901, 39.202],
              [-94.9065, 38.9884],
              [-94.8682, 39.0596],
              [-94.6053, 39.0432],
              [-94.6053, 39.1144],
              [-94.5998, 39.1582],
              [-94.7422, 39.1691],
              [-94.7751, 39.202],
              [-94.8627, 39.202],
            ],
          ],
        ],
      },
    },
  ],
};
const geojsonObject2 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        kind: "county",
        name: "Johnson",
        state: "KS",
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-94.9065, 38.9884],
              [-95.0544, 38.9829],
              [-95.0544, 38.7365],
              [-94.9668, 38.7365],
              [-94.6108, 38.7365],
              [-94.6108, 38.846],
              [-94.6053, 39.0432],
              [-94.8682, 39.0596],
              [-94.9065, 38.9884],
            ],
          ],
        ],
      },
    },
  ],
};

function Map() {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  return (
    <>
      <div>
        <Row>
          <Col md="12">
            <>
              <CardBody>
                <div id="map" className="map">
                  <Map1 center={fromLonLat(center)} zoom={zoom}>
                    <Layers>
                      <TileLayer source={osm()} zIndex={0} />
                    </Layers>
                    <Controls>
                      <FullScreenControl />
                      <ZoomControls />
                      <MousePositionControl />
                      <ScaleLineControls />
                      <ZoomToExtentControls />
                      <OverviewMapControls />
                      {/* <ZoomSliderControls className="ol-zoomslider" /> */}
                    </Controls>
                  </Map1>
                </div>
              </CardBody>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
