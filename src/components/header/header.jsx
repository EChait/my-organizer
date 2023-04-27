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

const pages = [
  { name: "Monthly Calendar", path: "/" },
  { name: "Daily Planner", path: "/dailyPlanner" },
  { name: "Groceries ", path: "/grocery" },
];

export function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page) {
      navigate(page.path);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#2c3e50",
        color: "#fff",
        borderBottom: "5px solid #ffb997",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" height={40} width={40} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 2,
                fontFamily: "Arial",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              My Organizer
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography
                    textAlign="center"
                    color="#393e46"
                    fontFamily="Arial"
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Arial",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffb997",
              textDecoration: "none",
            }}
          >
            My Organizer
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", color: "#fff" },

              justifyContent: "center",
              alignItems: "center",
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
                  fontFamily: "Arial",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box>
            <Button
              onClick={handleOpenUserMenu}
              sx={{ color: "inherit", fontWeight: 600, fontFamily: "Arial" }}
            >
              User
            </Button>
            <Menu
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Button
              onClick={handleOpenNavMenu}
              sx={{ color: "inherit", fontWeight: 600 }}
            >
              Menu
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
