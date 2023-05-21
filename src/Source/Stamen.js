import * as olSource from "ol/source";

function stamen() {
  return new olSource.Stamen();
  //return new olSource.Stamen({layer:"watercolor"});
}

export default stamen;
