import { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  DialogContentText,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Delete,
  Close,
  DeliveryDining,
} from "@mui/icons-material";
import { GlobalStateContext } from "../../globalState/globalStateContext";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import axios from "axios";

export const Grocery = () => {
  const {
    groceryItems,
    query,
    shoppingList,
    showShoppingList,
    anchorEl,
    confirmationOpen,
    deliveryDate,
    deliveryTime,
    totalPrice,
    snackbarOpen,
    snackbarMessage,
    setQuery,
    setSnackbarOpen,
    setDeliveryDate,
    setDeliveryTime,
    setConfirmationOpen,
    dialogGroceryOpen,
    setShoppingList,
    setAnchorEl,
    setDialogGroceryOpen,
    setShowShoppingList,
    setSnackbarMessage,
    setGroceryItems,
  } = useContext(GlobalStateContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [creditCard, setCC] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [CVV, setCVV] = useState("");

  const handlePlaceOrder = () => {
    setShoppingList([]);
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setCC("");
    setExpirationDate("");
    setCVV("");
  };

  const handleShoppingCartClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowShoppingList(true);
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedList = shoppingList.filter((item) => item !== itemToDelete);
    setShoppingList(updatedList);
    setSnackbarMessage(
      `${itemToDelete.title} has been removed from the shopping list.`
    );
    setSnackbarOpen(true);
  };

  const handleDialogOpen = () => {
    if (shoppingList.length === 0) {
      setSnackbarMessage(
        "Cannot schedule delivery with an empty shopping list"
      );
      setSnackbarOpen(true);
    } else {
      setDialogGroceryOpen(true);
    }
  };
  const handleDialogClose = () => {
    setDialogGroceryOpen(false);
  };

  const handleSchedule = (date, time) => {
    console.log(`Scheduled delivery for ${date} at ${time}`);
  };

  const addToShoppingList = (item) => {
    setShoppingList([...shoppingList, item]);
  };

  useEffect(() => {
    axios
      .get("https://api.spoonacular.com/food/products/search", {
        params: {
          apiKey: "cd032c7ef2804f46aff815be7ffbeaf7",
          query: query || "cookie",
        },
      })
      .then((response) => {
        const items = response.data.products;
        const requests = items.map((item) =>
          axios.get(`https://api.spoonacular.com/food/products/${item.id}`, {
            params: {
              apiKey: "cd032c7ef2804f46aff815be7ffbeaf7",
            },
          })
        );
        Promise.all(requests).then((responses) => {
          const newItems = items.map((item, index) => {
            const newItem = { ...item };
            newItem.price = responses[index].data.price;
            return newItem;
          });
          setGroceryItems(newItems);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  const filteredItems = groceryItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

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
          <Typography sx={{ fontWeight: "bold" }}>
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
          <IconButton onClick={handleShoppingCartClick}>
            <Badge badgeContent={shoppingList.length}>
              <ShoppingCart style={{ color: "#2c3e50" }} />
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
                    <ListItemText
                      primary={
                        item.title +
                        ": " +
                        item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      }
                    />
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                  {index !== shoppingList.length - 1 && <Divider />}
                </div>
              ))}
              <Divider></Divider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    marginTop: "5px",
                    mt: "auto",
                    mb: 1,
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    border: "3px solid #ffb997",
                    fontSize: "1rem",
                    padding: "8px 16px",
                    minWidth: "unset",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#2c3e50",
                      border: "3px solid #2c3e50",
                    },
                  }}
                  onClick={handleDialogOpen}
                >
                  Schedule a Grocery Delivery
                </Button>
              </div>

              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => setSnackbarOpen(false)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                }
              />
              <Dialog
                open={dialogGroceryOpen}
                onClose={handleDialogClose}
                sx={{
                  "& .MuiPaper-root": { borderRadius: "10px", width: "500px" },
                }}
              >
                <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Schedule a Grocery Delivery
                </DialogTitle>
                <DialogContent
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <DialogContentText>
                    Enter the details for your grocery delivery below.
                  </DialogContentText>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                    InputLabelProps={{ style: { color: "#2c3e50" } }}
                    sx={{
                      marginBottom: "10px",
                      bgcolor: "#fff",
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
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
                  <TextField
                    onChange={(event) => setLastName(event.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: "#2c3e50" } }}
                    label="Last Name"
                    sx={{
                      marginBottom: "10px",
                      bgcolor: "#fff",
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
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
                  <TextField
                    required
                    onChange={(event) => setAddress(event.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { color: "#2c3e50" } }}
                    label="Address"
                    sx={{
                      marginBottom: "10px",
                      bgcolor: "#fff",
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        onChange={(event) => setCity(event.target.value)}
                        fullWidth
                        label="City"
                        InputLabelProps={{ style: { color: "#2c3e50" } }}
                        sx={{
                          marginBottom: "10px",
                          bgcolor: "#fff",
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
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
                          "& .MuiOutlinedInput-input:focus": {
                            color: "#2c3e50",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        onChange={(event) => setState(event.target.value)}
                        InputLabelProps={{ style: { color: "#2c3e50" } }}
                        fullWidth
                        label="State"
                        sx={{
                          marginBottom: "10px",
                          bgcolor: "#fff",
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
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
                          "& .MuiOutlinedInput-input:focus": {
                            color: "#2c3e50",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <TextField
                      required
                      sx={{
                        marginBottom: "10px",
                        bgcolor: "#fff",
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
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
                      fullWidth
                      label="Delivery Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                        style: { color: "#2c3e50" },
                      }}
                      inputProps={{
                        min: new Date().toISOString().split("T")[0], // set minimum date to current date
                      }}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />

                    <FormControl fullWidth sx={{ marginBottom: 0 }}>
                      <InputLabel
                        required
                        id="delivery-time-label"
                        InputLabelProps={{ style: { color: "#2c3e50" } }}
                      >
                        Delivery Time
                      </InputLabel>
                      <Select
                        InputLabelProps={{ style: { color: "#2c3e50" } }}
                        labelId="delivery-time-label"
                        id="delivery-time-select"
                        value={deliveryTime}
                        label="Delivery Time"
                        onChange={(e) => setDeliveryTime(e.target.value)}
                      >
                        <MenuItem value={"8am-12pm"}>
                          8:00 AM - 12:00 PM
                        </MenuItem>
                        <MenuItem value={"12pm-4pm"}>
                          12:00 PM - 4:00 PM
                        </MenuItem>
                        <MenuItem value={"4pm-8pm"}>4:00 PM - 8:00 PM</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    InputLabelProps={{ style: { color: "#2c3e50" } }}
                    required
                    onChange={(event) => setCC(event.target.value)}
                    sx={{
                      marginBottom: "10px",
                      bgcolor: "#fff",
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
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
                    fullWidth
                    label="Credit Card Number"
                    placeholder="0000 0000 0000 0000"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        onChange={(event) =>
                          setExpirationDate(event.target.value)
                        }
                        sx={{
                          marginBottom: "10px",
                          bgcolor: "#fff",
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
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
                          "& .MuiOutlinedInput-input:focus": {
                            color: "#2c3e50",
                          },
                        }}
                        fullWidth
                        label="Expiration Date"
                        type="month"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#2c3e50" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        onChange={(event) => setCVV(event.target.value)}
                        InputLabelProps={{ style: { color: "#2c3e50" } }}
                        sx={{
                          marginBottom: "10px",
                          bgcolor: "#fff",
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
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
                          "& .MuiOutlinedInput-input:focus": {
                            color: "#2c3e50",
                          },
                        }}
                        fullWidth
                        label="CVV"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 100,
                            max: 999,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: "20px" }}>
                  <Button
                    onClick={handleDialogClose}
                    color="secondary"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#2c3e50",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#2c3e50",
                        border: "3px solid #2c3e50",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setConfirmationOpen(true);
                      handleDialogClose();
                      handleSchedule(deliveryDate, deliveryTime);
                      handlePlaceOrder();
                    }}
                    disabled={
                      firstName === "" ||
                      lastName === "" ||
                      address === "" ||
                      city === "" ||
                      state === "" ||
                      deliveryDate === "" ||
                      deliveryTime === "" ||
                      creditCard === "" ||
                      expirationDate === "" ||
                      CVV === ""
                    }
                    color="secondary"
                    variant="contained"
                    sx={{
                      backgroundColor: "#2c3e50",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#2c3e50",
                        border: "3px solid #2c3e50",
                      },
                    }}
                  >
                    Schedule
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={confirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                sx={{
                  "& .MuiPaper-root": { borderRadius: "10px", width: "500px" },
                }}
              >
                <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Delivery Scheduled
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Your grocery delivery has been scheduled for {deliveryDate}{" "}
                    at {deliveryTime}. Thank you for choosing our service!
                  </Typography>
                </DialogContent>

                <DialogActions sx={{ padding: "20px" }}>
                  <Button
                    onClick={() => setConfirmationOpen(false)}
                    color="secondary"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#2c3e50",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#fff", color: "#2c3e50" },
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
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
                  sx={{
                    mt: 0,
                    mb: 1,
                    fontWeight: "bold",
                    color: "#2c3e50",
                    fontSize: "1rem",
                  }}
                >
                  {item.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mt: 0,
                      mb: 1,
                      fontWeight: "bold",
                      color: "#2c3e50",
                      fontSize: "1rem",
                      marginRight: "8px",
                    }}
                  >
                    {item.price == 0 || item.price == null ? (
                      <RemoveShoppingCartIcon />
                    ) : (
                      <div> ${item.price.toFixed(2)}</div>
                    )}
                  </Typography>

                  {!item.price == 0 || !item.price == null ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => addToShoppingList(item)}
                      sx={{
                        mt: "auto",
                        mb: 1,
                        backgroundColor: "#2c3e50",
                        color: "#fff",
                        border: "3px solid #ffb997",
                        fontSize: "0.8rem",
                        padding: "4px",
                        minWidth: "unset",
                        height: "30px",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#2c3e50",
                          border: "3px solid #2c3e50",
                        },
                      }}
                      style={{ visibility: "visible" }}
                    >
                      Add to Cart
                    </Button>
                  ) : null}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      }
    </Grid>
  );
};
