import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  return (
    <div>
      <FormControl sx={{ m: 2, width: "100ch" }}>
        <OutlinedInput
          id="outlined-adornment-amount"
          onChange={(e) => props.onSearch(e.target.value.toLowerCase())}
          value={props.value}
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search"
          placeholder="Text to search"
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
