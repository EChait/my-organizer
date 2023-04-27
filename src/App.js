import "./App.css";
import { MonthlyCalendar } from "./components/monthlyCalendar/monthlyCalendar";
import { Header } from "./components/header/header";
import { DailyPlanner } from "./components/dailyPlanner/dailyPlanner";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Grocery } from "./components/grocery/grocery";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MonthlyCalendar />} />
        <Route path="/dailyPlanner" element={<DailyPlanner />} />
        <Route path="/grocery" element={<Grocery />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
