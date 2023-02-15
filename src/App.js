import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";
import Navigation from "./components/Navigation";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ItemList from "./pages/ItemList";
import Register from "./components/Register";
import EditItem from "./pages/EditItem";
import Catalogue from "./pages/Catalogue"
import { ConfigProvider } from "antd";

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
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          colorPrimary: "#664229",
          colorError: "#8B0000",
          fontFamily: "Montserrat",
        },
      }}
    >
      <BrowserRouter>
        <Navigation username={username} />
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Login /> : <ItemList />} />
          <Route
            path="/item-list"
            element={!isLoggedIn ? <Login /> : <ItemList />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/edit/:id"
            element={!isLoggedIn ? <Login /> : <EditItem />}
          />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
