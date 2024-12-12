import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MyFlashCard from "./pages/MyFlashCard";
import FlashcardDetails from "./pages/FlashCardDetails";
import NavLinks from "./components/Navlinks/Navlinks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-[90vw] sm:w-[80vw] mx-auto mt-10">
        <h1 className="text-[29px] font-semibold">Create Flashcard</h1>
        <NavLinks />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyFlashCard" element={<MyFlashCard />} />
        <Route path="card/:index" element={<FlashcardDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
