import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import FormProducts from "./components/FormProducts";
import jwt_decode from "jwt-decode";
import Navigation from "./components/Navigation";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ItemList from "./pages/ItemList";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        setIsLoggedIn(true);
        setUsername(decoded.id);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation username={username} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login /> : <FormProducts />} />
        <Route path="/item-list" element={!isLoggedIn ? <Login /> : <ItemList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
