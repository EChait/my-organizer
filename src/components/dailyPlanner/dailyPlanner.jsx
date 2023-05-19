import React, { useContext, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-material-ui-carousel";
import { GlobalStateContext } from "../../globalState/globalStateContext";
import WebFont from "webfontloader";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

export const DailyPlanner = () => {
  const {
    meals,
    newMeal,
    gratefulThings,
    gratefulList,
    quote,
    author,
    mealType,
    calories,
    open,
    newAppointments,
    currentCell,
    openEvent,
    description,
    details,
    setMeals,
    setNewMeal,
    setGratefulThings,
    setGratefulList,
    setQuote,
    setAuthor,
    setMealType,
    setCalories,
    setOpen,
    setNewAppointments,
    setCurrentCell,
    setOpenEvent,
    setDescription,
    setDetails,
    myEvents,
  } = useContext(GlobalStateContext);

  const handleAddGrateful = () => {
    if (gratefulThings.trim() !== "") {
      setGratefulList((prevList) => [...prevList, gratefulThings]);
      setGratefulThings("");
    }
  };

  useEffect(() => {
    const filterAppointments = () => {
      const today = new Date().toLocaleDateString();
      const filteredAppointments = myEvents.filter(
        (event) => event.date === today
      );
      setNewAppointments(filteredAppointments);
    };

    filterAppointments();
    console.log(filterAppointments);
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Pacifico", "Chilanka", "Droid Sans"],
      },
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/quotes", {
        params: {
          category: "happiness",
        },
        headers: {
          "X-Api-Key": "eLGHXoNIpoTjuitk9hnu1w==FdcBRtk43owPED1q",
        },
      })
      .then((response) => {
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddMeal = () => {
    const meal = {
      name: newMeal,
      type: mealType,
      calories: calories,
    };
    setMeals([...meals, meal]);
    setOpen(false);
    setNewMeal("");
    setMealType("");
    setCalories("");
  };

  const handlePlannerDialogClose = () => {
    setOpen(false);
  };

  const handleClickCell = (timeSlot) => {
    setCurrentCell(timeSlot);
    setOpenEvent(true);
  };

  const handlePlannerClose = () => {
    setOpenEvent(false);
  };

  const handleSave = () => {
    setNewAppointments([
      ...newAppointments,
      {
        time: currentCell,
        title: description,
        details: details,
      },
    ]);
    setDescription("");
    setDetails("");
    setOpenEvent(false);
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{ backgroundColor: "#fff", marginTop: "10px" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          style={{
            fontFamily: "Chilanka",
            fontWeight: "bold",
            color: "#2c3e50",
            textAlign: "center",
          }}
        >
          My Daily Planner
        </Typography>
        <Typography
          variant="h5"
          component="h1"
          align="center"
          style={{
            fontWeight: "bold",
            color: "#2c3e50",
            backgroundColor: "#ffb997",
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "Droid Sans",
          }}
        >
          Today: {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          backgroundColor: "#fff",
          marginTop: "5px",
          backgroundColor: "#2c3e50",
          border: "3px solid #ffb997",
          padding: "10px",
          margin: "20px",
          marginLeft: "50px",
          borderRadius: "20px",
          backgroundImage: "linear-gradient(to bottom, #2c3e50, #ffb997, #fff)", // add a background gradient
        }}
      >
        <Grid item xs={12} md={6}>
          <br></br>
          <br></br>
          <br></br>
          <Paper
            elevation={3}
            style={{
              width: "80%",
              margin: "0 auto",
              border: "3px solid #ffb997",
              padding: "1rem",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
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
              Inspirational Quote
            </Typography>

            <div style={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                component="p"
                style={{ fontFamily: "Droid Sans" }}
              >
                {quote}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ fontFamily: "Droid Sans" }}
              >
                {"- " + author}
              </Typography>
            </div>
          </Paper>
          <br></br>
          <br></br>
          <Paper
            elevation={3}
            sx={{ marginTop: "10px" }}
            style={{
              width: "80%",
              margin: "0 auto",
              border: "3px solid #ffb997",
              padding: "1rem",
              marginTop: "10px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
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
              Meal Tracker
            </Typography>
            <Button
              aria-label="add meal"
              color="primary"
              onClick={() => setOpen(true)}
              style={{
                display: "block",
                margin: "0 auto",
                color: "#2c3e50",
                textDecoration: "underline",
              }}
            >
              Click HERE to add a Meal
            </Button>

            <Dialog open={open} onClose={handlePlannerDialogClose}>
              <DialogTitle>Add Meal</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the details for your new meal below.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="New Meal"
                  fullWidth
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
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
                  margin="dense"
                  label="Meal Type"
                  fullWidth
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
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
                  margin="dense"
                  label="Calories"
                  fullWidth
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
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
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handlePlannerDialogClose}
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
                  onClick={handleAddMeal}
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
                  Add Meal
                </Button>
              </DialogActions>
            </Dialog>

            <Box
              sx={{ marginTop: "10px", maxHeight: "200px", overflowY: "auto" }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Food Item</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Calories</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {meals
                      .filter((meal) => meal.name && meal.type && meal.calories)
                      .map((meal, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {meal.name}
                          </TableCell>
                          <TableCell>{meal.type}</TableCell>
                          <TableCell>{meal.calories}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
          <br></br>
          <br></br>

          <Paper
            elevation={3}
            sx={{ marginTop: "10px" }}
            style={{
              width: "80%",
              margin: "0 auto",
              border: "3px solid #ffb997",
              padding: "1rem",
              marginTop: "10px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                backgroundColor: "#ffb997",
                textAlign: "center",
                marginBottom: "10px",
                textShadow:
                  "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
              }}
            >
              What I Am Grateful For Today:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="I Am Grateful For:"
                value={gratefulThings}
                onChange={(e) => setGratefulThings(e.target.value)}
                fullWidth
                margin="normal"
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
              <AddIcon
                sx={{ ml: 1, cursor: "pointer", color: "#2c3e5" }}
                onClick={handleAddGrateful}
              />
            </Box>
            <Typography
              variant="body1"
              component="div"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              <Carousel indicators={false} style={{ height: "600px" }}>
                {gratefulList.map((grateful, index) => (
                  <div key={index}>
                    <Typography
                      variant="h4"
                      style={{
                        fontFamily: "Droid Sans",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#2c3e50",
                      }}
                    >
                      {grateful}
                    </Typography>
                  </div>
                ))}
              </Carousel>
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={3}
            style={{
              width: "92%",
              margin: "0 auto",
              border: "3px solid #ffb997",
              padding: "1rem",
              marginTop: "10px",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                backgroundColor: "#ffb997",
                textAlign: "center",
                marginBottom: "10px",
                textShadow:
                  "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
              }}
            >
              Today's Plan
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ width: "25%", fontFamily: "Droid Sans" }}>
                    Time
                  </TableCell>
                  <TableCell style={{ width: "20%", fontFamily: "Droid Sans" }}>
                    Title
                  </TableCell>
                  <TableCell style={{ width: "55%", fontFamily: "Droid Sans" }}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.map((timeSlot) => (
                  <TableRow>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton aria-label="delete">
                          <AddIcon
                            key={timeSlot}
                            onClick={() => handleClickCell(timeSlot)}
                          />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>{timeSlot}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {newAppointments
                        .filter((appointment) => appointment.time === timeSlot)
                        .map((appointment) => appointment.title)
                        .join("\n")}
                    </TableCell>
                    <TableCell>
                      {newAppointments
                        .filter((appointment) => appointment.time === timeSlot)
                        .map((appointment) => appointment.details)
                        .join("\n")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={openEvent} onClose={handlePlannerClose}>
              <DialogTitle>Add Event</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the details for your event below.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Event"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  margin="dense"
                  label="Details"
                  fullWidth
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
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
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handlePlannerClose}
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
                  onClick={handleSave}
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
                  Add Event
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
