import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [myEvents, setMyEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState(null);
  const [eventDetails, setEventDetails] = useState("");

  const [groceryItems, setGroceryItems] = useState([]);
  const [query, setQuery] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogGroceryOpen, setDialogGroceryOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const itemPrices = shoppingList.map((item) => item.price);
  const totalPrice = itemPrices.reduce((acc, curr) => acc + curr, 0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [gratefulThings, setGratefulThings] = useState("");
  const [gratefulList, setGratefulList] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [mealType, setMealType] = useState("");
  const [calories, setCalories] = useState("");
  const [open, setOpen] = useState(false);
  const [newAppointments, setNewAppointments] = useState([]);
  const [currentCell, setCurrentCell] = useState("");
  const [openEvent, setOpenEvent] = useState(false);
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const state = {
    myEvents,
    eventTitle,
    eventTime,
    eventDetails,
    setMyEvents,
    setEventTitle,
    setEventTime,
    setEventDetails,

    groceryItems,
    query,
    shoppingList,
    showShoppingList,
    anchorEl,
    confirmationOpen,
    deliveryDate,
    deliveryTime,
    itemPrices,
    totalPrice,
    snackbarOpen,
    snackbarMessage,
    dialogGroceryOpen,
    setQuery,
    setSnackbarOpen,
    setDeliveryDate,
    setDeliveryTime,
    setConfirmationOpen,
    setDialogGroceryOpen,
    setAnchorEl,
    setShowShoppingList,
    setShoppingList,
    setGroceryItems,
    setSnackbarMessage,

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
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
