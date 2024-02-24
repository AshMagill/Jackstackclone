import React, { useState, useContext } from "react";
import StripeButton from "./StripeButton";
import { AuthContext } from "./AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CssBaseline,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Header({ onboarded, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      {/* Normalize CSS to ensure consistent styling across browsers */}
      <AppBar
        position="static"
        sx={{
          width: "100vw",
          height: "10vh",
          justifyContent: "center",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", height: "100%" }}>
          <Typography variant="h6" component="div">
            Jack's Charms CMS
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            {name && (
              <Typography variant="body1" component="span">
                {name}
              </Typography>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              disableRipple
            >
              <AccountCircle
                sx={{
                  fontSize: 40,
                  "&.Mui-focusVisible": {
                    outline: "none",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            </IconButton>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <StripeButton onboarded={onboarded} />
            <MenuItem onClick={(e) => logout(e)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
