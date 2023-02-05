import "./App.css";
import { useState, useEffect } from "react";
import FormProducts from "./components/FormProducts";
import Register from "./components/Register";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("I have token!");
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? <Login /> : <Register />}
      <FormProducts />
    </div>
  );
}

export default App;
