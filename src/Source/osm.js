import * as olSource from "ol/source";

const osm = () => {
  return new olSource.OSM({
    attributions: "@OpenStreetMap contributions",
  });
};

export default osm;
