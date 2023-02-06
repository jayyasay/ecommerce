import React from "react";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import FormProducts from "../components/FormProducts";
import jwt_decode from "jwt-decode";
import Navigation from "../components/Navigation";

function Home() {
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
    <>
    <Navigation username={username} />
      {!isLoggedIn ? <Login /> : <FormProducts />}
    </>
  );
}

export default Home;
