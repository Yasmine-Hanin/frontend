import React, { useState } from "react";
import "../../../components/Sidebar/sidebar.css";
import CatalogHeader from "./CatalogHeader";
import GroupedSelect from "../Form/GroupedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import TableButton from "./CatalogContent";
import LayerGroupComponent from "../../../components/Layers/LayerGroupComponent";
const Catalog = () => {
  const [color, setColor] = useState("#6e6e6e");
  return (
    <>
      <div id="mySidepanel" className="sidepanel">
        <div className="header">
          <CatalogHeader />
        </div>
        <p
          style={{
            padding: "10px 10px ",
            font: "Noto Sans",
            fontWeight: "bold",
          }}
        >
          Service
        </p>
        {/*<GroupedSelect />*/}

        <TableButton />
      </div>
      <button
        title="Catalog"
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        className="nav-link"
        onClick={() => {
          document.getElementById("mySidepanel").style.width = "450px";
          setColor("#4fbcd4");
        }}
      >
        <i
          style={{
            fontSize: "23px",
            position: "relative",
            top: "0px",
            textAlign: "center",
            width: "25px",
            color: color,
          }}
        >
          <FontAwesomeIcon icon={faFolder} />
        </i>

        {/*<i className="nc-icon nc-folder" title="Catalog" /> */}
      </button>
    </>
  );
};

export default Catalog;
