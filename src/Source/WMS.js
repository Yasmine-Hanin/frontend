import TileWMS from "ol/source/TileWMS.js";
function wms({ url, layers }) {
  return new TileWMS({
    //projection: "EPSG:4326", // here is the source projection
    url: url,
    params: { LAYERS: layers, TILED: true },
    serverType: "geoserver",
    transition: 0,
  });
}
export default wms;
