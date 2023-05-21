import TileJSON from "ol/source/TileJSON.js";
function json({ url, attributions }) {
  return new TileJSON({
    attributions: attributions,
    url: url,
  });
}
export default json;
