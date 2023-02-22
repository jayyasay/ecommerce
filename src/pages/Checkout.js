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

const steps = [
  {
    title: "Delivery details",
    content: <CustomerDetails />,
  },
  {
    title: "Confirm details",
    content: <ConfirmDetails />,
  },
  {
    title: "Payment",
    content: "Content Here",
  },
  {
    title: "Thank you",
    content: "Content Here",
  },
];

function Checkout() {
  const { Title } = Typography;

  const { cartItems, setCartItems } = useContext(CartContext);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
        <Col span={24} style={{textAlign: "center"}}>
          {current < steps.length - 1 && (
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
