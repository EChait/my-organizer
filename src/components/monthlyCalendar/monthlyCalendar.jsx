import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, IconButton, Button } from "@mui/material";
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

  const handleSelectSlot = ({ start, end }) => {
    // Do nothing
  };

  const handleDoubleClickEvent = ({ start }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      const newEvent = {
        start,
        end: moment(start).add(1, "hour").toDate(),
        title,
      };
      setEvents([...events, newEvent]);
    }
  };

  const EventComponent = ({ event }) => (
    <Button
      sx={{ width: "100%", textTransform: "none" }}
      onClick={() => console.log(event)}
    >
      {event.title}
    </Button>
  );

  return (
    <Box sx={{ height: "85vh", width: "75%", margin: "10px" }}>
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
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleDoubleClickEvent} // Add this prop
      />
    </Box>
  );
};
