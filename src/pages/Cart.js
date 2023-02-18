import { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { Table, Row, Col, Button, Popconfirm, Typography } from "antd";
import { Link } from "react-router-dom";

function Cart() {
  const { Title } = Typography;
  const { cartItems, setCartItems } = useContext(CartContext);
  const text = "Are you sure to delete this from your cart?";

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const data = [];
  cartItems.map((item) => {
    return data.push({
      key: item.id,
      name: (
        <Link to={`http://localhost:5000/product/${item.id}`}>{item.name}</Link>
      ),
      quantity: item.quantity,
      price: "₱ " + item.price,
    });
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) =>
        "₱ " + record.quantity * parseInt(record.price.substring(2)),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          placement="topLeft"
          title={text}
          onConfirm={() => confirmDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Remove from cart
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const confirmDelete = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const totalPrice = data.reduce(
    (total, item) => total + item.quantity * parseInt(item.price.substring(2)),
    0
  );

  return (
    <>
      <Row
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
      >
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Title> Your cart... </Title>
              <Table pagination={false} columns={columns} dataSource={data} />
            </Col>
          </Row>
          <Row justify="end">
            <Col span={18}>
              <Title
                level={2}
                style={{
                  textAlign: "right",
                }}
              >
                Total
              </Title>
            </Col>
            <Col span={3} offset={1}>
              <Title level={2}> ₱{totalPrice} </Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Cart;
