import { useState, useCallback } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mt: 2,
    }}
  >
    <IconButton onClick={() => onNavigate("PREV")} size="small">
      <ArrowBack />
    </IconButton>
    <Typography variant="h6" sx={{ mx: 2 }}>
      {label}
    </Typography>
    <IconButton onClick={() => onNavigate("NEXT")} size="small">
      <ArrowForward />
    </IconButton>
  </Box>
);

export const MonthlyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });
  const [time, setTime] = useState(moment().format("HH:mm"));

  const handleDoubleClickEvent = ({ start }) => {
    setNewEvent({
      title: "",
      start,
      end: moment(start).endOf("day").toDate(),
    });
    setDialogOpen(true);
  };

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTitleChange = (event) => {
    setNewEvent((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };

  const handleStartDateChange = (event) => {
    setNewEvent((prev) => ({
      ...prev,
      start: moment(`${event.target.value}T${time}`).toDate(),
    }));
  };

  const handleEndDateChange = (event) => {
    setNewEvent((prev) => ({
      ...prev,
      end: moment(`${event.target.value}T${time}`).toDate(),
    }));
  };
  const handleDialogSave = () => {
    setEvents([...events, newEvent]);
    setDialogOpen(false);
  };

  const { defaultDate, scrollToTime } = {
    defaultDate: new Date(),
    scrollToTime: new Date(1970, 1, 1, 6),
  };

  const EventComponent = ({ event }) => (
    <Button
      sx={{ width: "100%", textTransform: "none" }}
      onClick={() => console.log(event)}
    >
      {event.title}
    </Button>
  );
  const eventStyle = {
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "1px solid #2c3e50",
  };

  return (
    <>
      <Box
        sx={{
          height: "85vh",
          width: "75%",
          mx: "auto",
          mt: 4,
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          views={["month"]}
          defaultView="month"
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
          onSelectSlot={handleDoubleClickEvent}
          onSelectEvent={handleSelectEvent}
          selectable
          defaultDate={defaultDate}
          scrollToTime={scrollToTime}
          eventStyleGetter={(event, start, end, isSelected) => {
            return { style: eventStyle };
          }}
        />
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={newEvent.title}
              onChange={handleTitleChange}
            />
            <TextField
              margin="dense"
              label="Start Date and Time"
              type="datetime-local"
              fullWidth
              value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => {
                handleStartDateChange(e);
                setTime(moment(e.target.value).format("HH:mm"));
              }}
            />

            <TextField
              margin="dense"
              label="End Date and Time"
              type="datetime-local"
              fullWidth
              value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => {
                handleEndDateChange(e);
                setTime(moment(e.target.value).format("HH:mm"));
              }}
            />

            <TextField
              margin="dense"
              label="Time"
              type="time"
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
