import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import {
  Steps,
  message,
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  Typography,
} from "antd";

function ConfirmDetails() {

    const { cartItems, setCartItems } = useContext(CartContext);

    return (
        <>
        {cartItems.map((item) => (
          <div>
            <h1>{item.name}</h1>
            <p>{item.quantity}</p>
          </div>
        ))}
        </>
    )
}

export default ConfirmDetails