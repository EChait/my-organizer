import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ArrowBack, ArrowForward, Edit } from "@mui/icons-material";
import WebFont from "webfontloader";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useContext,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../globalState/globalStateContext";

export const MonthlyCalendar = () => {
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  const {
    myEvents,
    eventTitle,
    eventTime,
    eventDetails,
    setMyEvents,
    setEventTitle,
    setEventTime,
    setEventDetails,
    deliveryDate,
    deliveryTime,
  } = useContext(GlobalStateContext);

  const SET_DIALOG_OPEN = "SET_DIALOG_OPEN";
  const SET_SELECTED_EVENT = "SET_SELECTED_EVENT";
  const SET_EDITING_EVENT = "SET_EDITING_EVENT";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DIALOG_OPEN:
        return { ...state, dialogOpen: action.payload };
      case SET_SELECTED_EVENT:
        return { ...state, selectedEvent: action.payload };
      case SET_EDITING_EVENT:
        return { ...state, editingEvent: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    dialogOpen: false,
    selectedEvent: null,
    editingEvent: null,
  });

  const { dialogOpen, selectedEvent, editingEvent } = state;

  const setDialogOpen = useCallback((value) => {
    dispatch({ type: SET_DIALOG_OPEN, payload: value });
  }, []);

  const setSelectedEvent = useCallback((event) => {
    dispatch({ type: SET_SELECTED_EVENT, payload: event });
  }, []);

  const setEditingEvent = useCallback((event) => {
    dispatch({ type: SET_EDITING_EVENT, payload: event });
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = "#2c3e50";
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "#fff",
      border: "2px solid #ffb997",
      display: "block",
      fontFamily: "Chilanka",
      fontWeight: "bold",
    };
    return {
      style,
    };
  };

  const Popup = ({ localizer }) => {
    const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  };

  const localizer = momentLocalizer(moment);

  const CustomToolbar = ({ label, onNavigate }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={() => onNavigate("PREV")} size="small">
        <ArrowBack />
      </IconButton>
      <Typography
        style={{
          fontSize: "40px",
          fontFamily: "Chilanka",
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      <IconButton onClick={() => onNavigate("NEXT")} size="small">
        <ArrowForward />
      </IconButton>
    </Box>
  );

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      setDialogOpen(true);
      setMyEvents([
        ...myEvents,
        {
          start: slotInfo.start,
          end: slotInfo.end,
          title: eventTitle,
          time: eventTime,
        },
      ]);
      setEventTitle("");
      setEventTime("");
      console.log(myEvents);
    },
    [myEvents, eventTitle, eventTime]
  );

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setEventDetails(event.details);
    setEventTime(event.time);
    setEditingEvent(event);
  }, []);

  useEffect(() => {
    if (deliveryDate && deliveryTime) {
      const eventStart = moment(deliveryDate)
        .set({
          hours: moment(deliveryTime, "HH:mm").hours(),
          minutes: moment(deliveryTime, "HH:mm").minutes(),
        })
        .toDate();
      const eventEnd = moment(eventStart).add(1, "hour").toDate();
      console.log(deliveryDate);

      const startHour = moment(eventStart).format("h A");

      const groceryDeliveryEvent = {
        start: eventStart,
        end: eventEnd,
        title: "Grocery Delivery",
        time: startHour,
        details: `Your Delivery Slot is ${deliveryTime}`,
      };

      setMyEvents([...myEvents, groceryDeliveryEvent]);
    }
  }, [deliveryDate, deliveryTime]);

  Popup.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
  };

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setMyEvents((prevEvents) =>
      prevEvents.filter((prevEvent) => prevEvent.title !== "")
    );
    setEventTitle("");
    setEventTime("");
    setEventDetails("");
  }, []);

  const handleAddEvent = useCallback(() => {
    setMyEvents((prevEvents) =>
      prevEvents.map((prevEvent) => {
        if (prevEvent.title === "") {
          const eventStart = moment(prevEvent.start).toDate();
          const eventTimeObj = moment(eventTime, "HH:mm").toDate();
          const newStart = moment(eventStart)
            .set("hours", moment(eventTimeObj).get("hours"))
            .set("minutes", moment(eventTimeObj).get("minutes"))
            .toDate();
          const newTitle = `${eventTitle}  
          `;
          return {
            ...prevEvent,
            title: newTitle,
            time: eventTimeObj,
            start: newStart,
            details: eventDetails,
          };
        }
        return prevEvent;
      })
    );
    setDialogOpen(false);
    setEventTitle("");
    setEventTime("");
    setEventDetails("");
  }, [eventTitle, eventTime, eventDetails]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Pacifico", "Chilanka", "Droid Sans"],
      },
    });
  }, []);

  return (
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
        events={myEvents}
        views={["month"]}
        defaultView="month"
        components={{
          toolbar: CustomToolbar,
        }}
        selectable
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        Popup
        eventPropGetter={eventStyleGetter}
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <br></br>
          </DialogContentText>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              autoFocus
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
          </Box>
          <Box sx={{ mb: 2, marginTop: "10px" }}>
            <TextField
              label="Event Time"
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: { color: "#2c3e50" },
              }}
              InputProps={{
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
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
                },
              }}
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
              }}
            />

            <DialogContent>
              <DialogContentText>
                Please enter the details of your event:
              </DialogContentText>
              <TextField
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#2c3e50" },
                }}
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
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
                  },
                }}
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
                }}
                autoFocus
                margin="dense"
                id="eventDetails"
                label="Event Details"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              />
            </DialogContent>
          </Box>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
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
              onClick={handleAddEvent}
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
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog
        open={Boolean(editingEvent)}
        onClose={() => {
          setEditingEvent(null);
          setEventTitle("");
          setEventTime("");
          setEventDetails("");
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Edit Event{" "}
          {selectedEvent && (
            <Box mt={1}>
              <Typography variant="subtitle1">
                Title: {selectedEvent.title}
                <Typography variant="subtitle2">
                  Time:{moment(eventTime, "HH:mm").format("LT")}
                </Typography>
              </Typography>
              <Typography variant="body2">
                Details: {selectedEvent.details}
              </Typography>
            </Box>
          )}
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
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
        </DialogContent>
        <DialogContent style={{ overflow: "hidden" }}>
          <TextField
            label="Event Time"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
              style: { color: "#2c3e50" },
            }}
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
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
              },
            }}
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
            }}
          />
        </DialogContent>
        <DialogContent style={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Details"
            fullWidth
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditingEvent(null);
              setEventTitle("");
              setEventTime("");
              setEventDetails("");
            }}
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
              setMyEvents((prevEvents) =>
                prevEvents.map((prevEvent) => {
                  if (prevEvent === editingEvent) {
                    return {
                      ...prevEvent,
                      title: eventTitle,
                      time: eventTime,
                      details: eventDetails,
                    };
                  }
                  return prevEvent;
                })
              );
              setEditingEvent(null);
              setEventTitle("");
              setEventTime("");
              setEventDetails("");
            }}
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
