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

function ConfirmDetails(props) {
  const { customerDetails } = props;

  const { cartItems, setCartItems } = useContext(CartContext);

  if (!customerDetails) {
    return <p>Loading...</p>; // or some other fallback UI
  }

  console.log(customerDetails);

  return (
    <>
      <h2>Customer Details</h2>
      <p>Name: {customerDetails.customerName}</p>
      <p>Address Line 1: {customerDetails.customerAddress1}</p>
      <p>Address Line 2: {customerDetails.customerAddress2}</p>
      <p>City: {customerDetails.customerCity}</p>
      <p>Country: {customerDetails.customerCountry}</p>
      {cartItems.map((item) => (
        <div>
          <h1>{item.name}</h1>
          <p>{item.quantity}</p>
        </div>
      ))}
    </>
  );
}

export default ConfirmDetails;
