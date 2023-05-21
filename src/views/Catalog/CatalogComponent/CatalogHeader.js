import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import CloseIcon from "@mui/icons-material/Close";

export default function CatalogHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*Inside the IconButton, we 
           can render various icons*/}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/*This is a simple Menu 
             Icon wrapped in Icon */}
          <FolderIcon />
        </IconButton>
        {/* The Typography component applies 
           default font weights and sizes */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Catalog
        </Typography>
        <Button
          onClick={() => {
            document.getElementById("mySidepanel").style.width = "0";
          }}
          color="inherit"
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/*This is a simple Menu 
             Icon wrapped in Icon */}
            <CloseIcon />
          </IconButton>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
