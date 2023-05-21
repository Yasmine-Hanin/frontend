import { useState, useEffect } from "react";

const LayerSwitcher = ({ layers }) => {
  const [searchValue, setSearchValue] = useState("");
  const [layerVisibility, setLayerVisibility] = useState({});

  function filterLayers(rex, layers) {
    let found = false;
    layers.forEach(function (l) {
      // Layer Group
      if (l.getLayers) {
        if (filterLayers(rex, l.getLayers().getArray())) {
          l.set("noLayer", false);
          found = true;
        } else {
          l.set("noLayer", true);
        }
      } else {
        if (rex.test(l.get("title"))) {
          l.setVisible(true);
          setLayerVisibility((prevVisibility) => ({
            ...prevVisibility,
            [l.get("id")]: true,
          }));
          found = true;
        } else {
          l.setVisible(false);
          setLayerVisibility((prevVisibility) => ({
            ...prevVisibility,
            [l.get("id")]: false,
          }));
        }
      }
    });
    return found;
  }

  function handleSearchInputChange(event) {
    const rex = new RegExp(event.target.value, "i");
    filterLayers(rex, layers);
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    // Force layer switcher redraw
    // layers[0].changed();
  }, [layerVisibility]);

  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        value={searchValue}
        onChange={handleSearchInputChange}
      />
      <ul>
        {layers.map((layer) => {
          const isVisible = layerVisibility[layer.get("id")];
          const isLayerGroup = layer.getLayers;
          const hasNoLayer = layer.get("noLayer");
          const isLayerVisible = !isLayerGroup && isVisible;

          if (isLayerGroup && hasNoLayer) {
            return null;
          }

          const layerTitle = layer.get("title");
          const regex = new RegExp(searchValue, "i");
          const isMatch = regex.test(layerTitle);

          if (!isLayerGroup && !isMatch) {
            return null;
          }

          return (
            <li
              key={layer.get("id")}
              style={{ display: isLayerGroup && hasNoLayer ? "none" : "block" }}
            >
              {isLayerGroup && <span>{layerTitle}</span>}
              {!isLayerGroup && (
                <div>
                  <input
                    type="checkbox"
                    checked={isLayerVisible}
                    onChange={() => {}}
                  />
                  <label>{layerTitle}</label>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LayerSwitcher;
