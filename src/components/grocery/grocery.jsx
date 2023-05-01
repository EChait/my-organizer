import axios from "axios";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { PlaylistAddCheck, Search, ShoppingCart } from "@mui/icons-material";

export const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spoonacular.com/food/products/search", {
        params: {
          apiKey: "cd032c7ef2804f46aff815be7ffbeaf7",
          query: query || "cookie",
        },
      })
      .then((response) => {
        setGroceryItems(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  const filteredItems = groceryItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const addToShoppingList = (item) => {
    setShoppingList([...shoppingList, item]);
  };

  const handleShoppingCartClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowShoppingList(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowShoppingList(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginLeft: "10px",
          }}
        >
          <TextField
            label="Search for Grocery Items"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: "#2c3e50" } }}
            sx={{
              marginBottom: "10px",
              bgcolor: "#fff",
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2c3e50",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#2c3e50",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#2c3e50",
                },
              "& .MuiOutlinedInput-input": { color: "#2c3e50" },
              "& .MuiOutlinedInput-input:focus": { color: "#2c3e50" },
            }}
          />
          <IconButton>
            <Search style={{ color: "#2c3e50" }} />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginRight: "10px",
          }}
        >
          <IconButton onClick={handleShoppingCartClick}>
            <Badge badgeContent={shoppingList.length}>
              <PlaylistAddCheck style={{ color: "#2c3e50" }} />
            </Badge>
          </IconButton>
          <div>
            <Menu
              anchorEl={anchorEl}
              open={showShoppingList}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Shopping List
                  <Divider></Divider>
                </Typography>
              </MenuItem>
              {shoppingList.map((item, index) => (
                <div key={item.id}>
                  <ListItem>
                    <ListItemText primary={item.title} />
                  </ListItem>
                  {index !== shoppingList.length - 1 && <Divider />}
                </div>
              ))}
            </Menu>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}></Grid>
      <Grid item xs={12}></Grid>
      {
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              color: "#2c3e50",
              backgroundColor: "#ffb997",
              textAlign: "center",
              marginBottom: "10px",
              textShadow:
                "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
            }}
          >
            Our Top Picks For You!
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {filteredItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 1,
                  border: "1px solid lightgray",
                  width: "25%",
                  flexGrow: 0,
                  flexBasis: "25%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "80%",
                    height: "120px",
                    objectFit: "contain",
                    marginBottom: "8px",
                  }}
                />
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ mt: 0, mb: 1, fontWeight: "bold", color: "#2c3e50" }}
                >
                  {item.title}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addToShoppingList(item)}
                  sx={{
                    mt: "auto",
                    mb: 1,
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#2c3e50",
                      border: "3px solid #2c3e50",
                    },
                    border: "3px solid #ffb997",
                  }}
                >
                  Add to Shopping List
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
      }
    </Grid>
  );
};
