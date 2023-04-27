import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";

export const DailyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    time: "",
    description: "",
  });
  const [goals, setGoals] = useState("");
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [gratefulThings, setGratefulThings] = useState("");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [waterLogs, setWaterLogs] = useState([]);
  const [waterGoal, setWaterGoal] = useState(8);

  const handleAppointmentStatusChange = (index) => {
    const newAppointments = [...appointments];
    newAppointments[index].isDone = !newAppointments[index].isDone;
    setAppointments(newAppointments);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const [waterTracker, setWaterTracker] = useState([]);
  const handleAddWater = () => {
    const newWaterLogs = [...waterLogs, new Date().toLocaleString()];
    setWaterLogs(newWaterLogs);
    const newWaterTracker = [...waterTracker, newWaterLogs.length];
    setWaterTracker(newWaterTracker);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { taskName: newTask, isDone: false }]);
      setNewTask("");
    }
  };

  const handleTaskStatusChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
  };

  const handleAddAppointment = () => {
    if (
      newAppointment.time.trim() !== "" &&
      newAppointment.description.trim() !== ""
    ) {
      setAppointments([...appointments, newAppointment]);
      setNewAppointment({ time: "", description: "" });
    }
  };

  const handleAddMeal = () => {
    if (newMeal.trim() !== "") {
      setMeals([...meals, newMeal]);
      setNewMeal("");
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ backgroundColor: "#fff", marginTop: "10px" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          style={{
            fontFamily: "Arial",
            textAlign: "center",
            textDecoration: "underline",
            color: "#2c3e50",
          }}
        >
          Daily Planner
        </Typography>
        <Typography
          variant="h5"
          component="h1"
          align="center"
          style={{
            fontFamily: "Arial",
            textAlign: "center",
            backgroundColor: "#ffb997",
            color: "#2c3e50",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Today: {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
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
            style={{ color: "#2c3e50", textAlign: "center" }}
          >
            Today's Goals
          </Typography>
          <TextField
            InputLabelProps={{ style: { color: "#2c3e50" } }}
            sx={{
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
            label="Add Goal"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setGoals(e.target.value)}
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
              Add Goal
            </Button>
          </div>
          <Typography variant="body1" component="ul">
            {goals &&
              goals
                .split("\n")
                .map((goal, index) => <li key={index}>{goal}</li>)}
          </Typography>
        </Paper>

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
          <Typography variant="h5" component="h2">
            Priorities
          </Typography>
          <TextField
            label="Add Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
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
              Add Task
            </Button>
          </div>
          <Typography variant="body1" component="ul">
            {tasks.map((task, index) => (
              <li key={index}>
                <Checkbox
                  checked={task.isDone}
                  onChange={() => handleTaskStatusChange(index)}
                />
                {task.taskName}
              </li>
            ))}
          </Typography>
        </Paper>
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
          <Typography variant="h5" component="h2">
            Meal Tracker
          </Typography>
          <TextField
            label="New Meal"
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMeal}
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
            Add Meal
          </Button>
          <Typography variant="body1" component="ul">
            {meals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </Typography>
        </Paper>
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
          <Typography variant="h5" component="h2">
            I AM GRATEFUL FOR:
          </Typography>
          <TextField
            label="Grateful Things"
            value={gratefulThings}
            onChange={(e) => setGratefulThings(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            ADD
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            width: "80%",
            margin: "0 auto",
            border: "3px solid #ffb997",
            padding: "1rem",
            marginTop: "10px",
          }}
        >
          <Typography variant="h5" component="h2">
            Appointments
          </Typography>
          <TextField
            label="Time"
            type="time"
            value={newAppointment}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            value={newAppointment.title}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, title: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAppointment}
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
            Add Appointment
          </Button>
          <Typography variant="body1" component="ul">
            {appointments.map((appointment, index) => (
              <li key={index}>
                <Checkbox
                  checked={appointment.isDone}
                  onChange={() => handleAppointmentStatusChange(index)}
                />
                {appointment.time} - {appointment.title}
              </li>
            ))}
          </Typography>
        </Paper>
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
          <Typography variant="h5" component="h2">
            Notes
          </Typography>
          <TextField
            label="Add Note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
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
            Add Note
          </Button>
          <Typography variant="body1" component="ul">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </Typography>
        </Paper>
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
          <Typography variant="h5" component="h2">
            Water Tracker
          </Typography>
          <Typography variant="h6" component="h3" sx={{ marginTop: "10px" }}>
            Today's Goal: 8 cups (64 oz)
          </Typography>
          <Typography variant="h6" component="h3" sx={{ marginTop: "10px" }}>
            Today's Progress: {waterTracker} cups ({waterTracker * 8} oz)
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddWater}
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
            Add Water
          </Button>
          <Typography variant="body1" component="ul" sx={{ marginTop: "10px" }}>
            {waterLogs.map((waterLog, index) => (
              <li key={index}>{waterLog} cups</li>
            ))}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
