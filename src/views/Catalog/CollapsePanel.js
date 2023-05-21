import React, { useState } from "react";
import "./CollapsePanel.css"; // Import the CSS file
import FolderIcon from "@mui/icons-material/Folder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import CatalogContent from "./CatalogComponent/CatalogContent";
function CollapsePanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [color, setColor] = useState("#6e6e6e");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setColor("#4fbcd4");
  };

  return (
    <>
      <button
        //className="open-button"
        onClick={toggleCollapsed}
        title="Catalog"
        className="nav-link"
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <i
          style={{
            fontSize: "23px",
            position: "relative",
            top: "0px",
            textAlign: "center",
            width: "25px",
            color: collapsed ? "rgb(110, 110, 110)" : "#4fbcd4",
          }}
        >
          <FontAwesomeIcon icon={faFolder} />
        </i>
      </button>
      <div className={`side-panel ${collapsed ? "collapsed" : ""}`}>
        <div className="panel-header">
          <i>
            <FolderIcon />
          </i>
          <h3>Catalog</h3>
          <button className="close-button" onClick={toggleCollapsed}></button>
        </div>
        <div className="panel-content">
          <p
            style={{
              padding: "10px 10px ",
              font: "Noto Sans",
              fontWeight: "bold",
            }}
          >
            Service
          </p>

          {/*<SearchButton />*/}
          <CatalogContent />
        </div>
      </div>
    </>
  );
}

export default CollapsePanel;
