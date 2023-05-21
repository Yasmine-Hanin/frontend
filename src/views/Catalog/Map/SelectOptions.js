import React, { useEffect, useContext, useState } from "react";
import Stamen from "ol/source/Stamen";
import Tile from "ol/layer/Tile";
import { SelectedValueContext } from "../../../Context/SelectedValueContext";
import LayerGroupContext from "../../../Context/LayerGroupContext";

const SelectOptions = () => {
  const { selectedValue } = useContext(SelectedValueContext);
  const { group } = useContext(LayerGroupContext);

  const styles = ["terrain-background", "toner", "watercolor"];

  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const newLayers = styles.map(
      (style) =>
        new Tile({
          title: style,
          type: "base",
          visible: style === selectedValue,
          source: new Stamen({
            layer: style,
          }),
        })
    );
    setLayers(newLayers);
  }, [selectedValue]);

  useEffect(() => {
    if (group) {
      layers.forEach((layer) => {
        group.getLayers().push(layer);
      });
    }

    return () => {
      if (group) {
        layers.forEach((layer) => {
          group.getLayers().pop(layer);
        });
      }
    };
  }, [group, layers]);

  return <></>;
};

export default SelectOptions;
