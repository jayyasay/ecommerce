import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
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
import { Link } from "react-router-dom";
import CustomerDetails from "../components/checkout/CustomerDetails";
import ConfirmDetails from "../components/checkout/ConfirmDetails";
import Payment from "../components/checkout/Payment";
import Confirmation from "../components/checkout/Confirmation";

function Checkout() {
  const { Title } = Typography;

  const { cartItems, setCartItems } = useContext(CartContext);
  const [current, setCurrent] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({});

  const updateCustomerDetails = (values) => {
    setCustomerDetails((prevCustomerDetails) => ({
      ...prevCustomerDetails,
      ...values,
    }));
    next();
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNextStep = () => {
    setCurrent((prevStep) => prevStep + 1);
  };

  const steps = [
    {
      title: "Delivery details",
      content: (
        <CustomerDetails updateCustomerDetails={updateCustomerDetails} customerDetails={customerDetails}/>
      ),
    },
    {
      title: "Confirm details",
      content: <ConfirmDetails customerDetails={customerDetails} />,
    },
    {
      title: "Payment",
      content: <Payment onNextStep={handleNextStep} />,
    },
    {
      title: "Thank you",
      content: <Confirmation />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Row style={{ maxWidth: "1020px", margin: "auto" }} gutter={20}>
        <Col span={24}>
          <Title style={{ margin: "auto" }}>Checkout</Title>
          <Steps current={current} items={items} />
          <div>{steps[current].content}</div>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          {current === 0 ? null : (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {/* {cartItems.map((item) => (
          <div>
            <h1>{item.name}</h1>
            <p>{item.quantity}</p>
          </div>
        ))} */}
        </Col>
      </Row>
    </>
  );
}

export default Checkout;
