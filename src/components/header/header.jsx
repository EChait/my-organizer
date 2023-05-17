import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import WebFont from "webfontloader";
import { useEffect } from "react";

const pages = [
  { name: "Monthly Calendar", path: "/" },
  { name: "Daily Planner", path: "/dailyPlanner" },
  { name: "Groceries ", path: "/grocery" },
];

export function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page) {
      navigate(page.path);
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Pacifico", "Chilanka", "Droid Sans"],
      },
    });
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        height: 100,
        bgcolor: "#2c3e50",
        color: "#fff",
        borderBottom: "5px solid #ffb997",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexDirection: "column", height: 20 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box>
              <br></br>
              <img src={logo} alt="Logo" height={60} width={60} />
            </Box>
            <Box sx={{ ml: 2 }}>
              <br></br>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: "Chilanka",
                  fontWeight: "bold",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "60px",
                }}
              >
                My Organizer
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // change to flex-start
              alignItems: "center",
              mt: 0.5,
              flexWrap: "wrap",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{
                  color: "inherit",
                  fontWeight: 600,
                  mx: 1,
                  fontFamily: "Chilanka",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              mt: 2,
            }}
          >
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ color: "inherit" }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
