import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/joy/Button";
import SearchBar from "material-ui-search-bar";

import Options from "./Select";
import LayerSwitcherComponent from "components/Layers/LayerSwitcherComponent";
import SearchButton from "./SearchButton";
import LayerGroupComponent from "components/Layers/LayerGroupComponent";

export default function GroupedSelect() {
  const originalRows = ["terrain-background", "toner", "watercolor"];
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 400 }}>
        <Stack direction="row" spacing={0}>
          <Options />
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
        </Stack>
      </FormControl>
      <br />
      <FormControl sx={{ m: 2, minWidth: 300 }}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          placeholder={"Text to Search"}
        />
        {/*<LayerSwitcherComponent />
        <Main />*/}
      </FormControl>
      <br />
      <SearchButton />
    </div>
  );
}
