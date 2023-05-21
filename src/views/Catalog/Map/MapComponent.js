import React, { useState, useContext, useEffect } from "react";
import { fromLonLat } from "ol/proj";
import Map1 from "../../../components/Map/Map";
import Layers from "../../../components/Layers/Layers";
import {
  Controls,
  FullScreenControl,
  MousePositionControl,
  OverviewMapControls,
  ScaleLineControls,
  ZoomSliderControls,
  ZoomToExtentControls,
  LayerSwitcherControls,
  LayerSwitcherImgControls,
  ZoomButtons,
  BarControl,
  AttributionsControl,
} from "../../../Controls";
import TileLayer from "../../../components/Layers/TileLayer";
import { osm } from "../../../Source";
import Overlays from "../../../Overlay/Overlay";
import PopupOverlay from "../../../Overlay/PopupOverlay";
import LayerGroupComponent from "../../../components/Layers/LayerGroupComponent";
import ImageLayerComponent from "../../../components/Layers/ImageLayerComponent";
import { SelectedLayerNameContext } from "../../../Context/SelectedLayerName";
import { MoonLoader } from "react-spinners";
import { CurrentBseLayerContext } from "../../../Context/CurrentBseLayerContext";
import { TileJSON } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import VectorLayer from "components/Layers/VectorLayer";

function MapComponent() {
  const [center, setCenter] = useState([-5.818732, 35.785589]);
  const [zoom, setZoom] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLayerName, setSelectedLayerName } = useContext(
    SelectedLayerNameContext
  );
  const { currentBseLayer, setCurrentBseLayer } = useContext(
    CurrentBseLayerContext
  );

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const selectedLayer =
    selectedLayerName !== "" ? (
      <ImageLayerComponent selectedLayer={selectedLayerName} />
    ) : null;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <MoonLoader
          color="blue"
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Map1 center={fromLonLat(center)} zoom={zoom}>
          <LayerGroupComponent title="Base Map">
            <Layers>
              {currentBseLayer === "osm" ? (
                <TileLayer source={osm()} zIndex={0} title="Open Street Map" />
              ) : (
                <TileLayer
                  source={
                    new TileJSON({
                      attributions: "@MapTiler",
                      url: "https://api.maptiler.com/maps/hybrid/tiles.json?key=wsI14ljTpD8P7mkLIkes",
                    })
                  }
                  zIndex={0}
                  title="Satellite"
                />
              )}
            </Layers>{" "}
          </LayerGroupComponent>
          <LayerGroupComponent title="Overlay">
            <VectorLayer
              title="Vector Layer"
              source={new VectorSource()}
              style={
                new Style({
                  fill: new Fill({
                    color: "rgba(255, 255, 255, 0.2)",
                  }),
                  stroke: new Stroke({
                    color: "#ffcc33",
                    width: 2,
                  }),
                })
              }
              zIndex={1}
            />
            {selectedLayer}
          </LayerGroupComponent>
          <Controls>
            <AttributionsControl />
            <MousePositionControl />
            <ScaleLineControls />
            <OverviewMapControls />
            <LayerSwitcherControls />
            <BarControl />
          </Controls>
          <Overlays>
            <PopupOverlay />
          </Overlays>
        </Map1>
      )}
    </>
  );
}

export default MapComponent;
