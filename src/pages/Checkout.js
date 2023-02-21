import { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  console.log(cartItems);
  return (
    <>
      {cartItems.map((item) => (
        <div>
          <h1>{item.name}</h1>
          <p>{item.quantity}</p>
        </div>
      ))}
    </>
  );
}

export default Checkout;
