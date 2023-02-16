import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Link,
  Typography,
  Divider,
  Button,
  Select,
  Space,
  Table,
  Tag,
  Skeleton,
} from "antd";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/Breadcrumb";
import { Buffer } from "buffer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CartContext } from "../CartContext";

function ProductPage() {
  const { id } = useParams();

  const { Title, Text } = Typography;

  const navigate = useNavigate();

  const [fetchProduct, setFetchProduct] = useState([]);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { cartItems, setCartItems } = useContext(CartContext);

  const productList = () => {
    axios.get(`http://localhost:3001/api/db/products/${id}`).then((res) => {
      setFetchProduct(res.data);
    });
  };

  //   const formStyle = useMemo(
  //     () => ({
  //       input: {
  //         textAlign: "left",
  //       },
  //     }),
  //     []
  //   );

  const columns = [
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
    },
  ];

  const data = [
    {
      key: "1",
      width: fetchProduct.itemWidth + '"',
      height: fetchProduct.itemHeight + '"',
      length: fetchProduct.itemLength + '"',
    },
  ];

  const handleAddToCart = () => {
    const item = {
      id: fetchProduct._id,
      name: fetchProduct.itemName,
      quantity: selectedQuantity,
      price: fetchProduct.itemPrice,
    };
  
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
  
    if (existingItemIndex > -1) {
      const newCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + selectedQuantity,
            }
          : cartItem
      );
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  useEffect(() => {
    if (fetchProduct.itemQuantity) {
      const options = [];
      for (let i = 1; i <= fetchProduct.itemQuantity; i++) {
        options.push({ value: i, label: `${i}` });
      }
      setQuantityOptions(options);
    }
    productList();
  }, [fetchProduct.itemQuantity]);

  return (
    <>
      <Row style={{ maxWidth: "1200px", margin: "auto" }}>
        <Row gutter={[0, 40]} style={{ marginTop: 20, marginBottom: 20 }}>
          <BreadCrumb itemName={fetchProduct.itemName} />
        </Row>

        <Row gutter={[40, 8]} justify="center">
          <Col span={10}>
            {fetchProduct.itemImage && (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    alt="example"
                    src={`data:image/jpg;base64,${Buffer.from(
                      fetchProduct.itemImage.data.data
                    ).toString("base64")}`}
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}
          </Col>
          <Col span={14}>
            <Title>{fetchProduct.itemName}</Title>
            <Divider />
            <Title level={2}>
              ₱ {fetchProduct.itemPrice}{" "}
              <small style={{ fontSize: 12 }}>tax included</small>
            </Title>
            <Divider />
            <Title level={3}>Quantity</Title>
            <Space direction="vertical" size="middle">
              <Select
                defaultValue={1}
                style={{
                  width: 120,
                }}
                onChange={(value) => setSelectedQuantity(value)}
                options={quantityOptions}
              />

              <Button type="primary" size="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Space>
            <Divider />
            <Title level={3}>Description</Title>
            <Text>{fetchProduct.itemDesc}</Text>
            <Divider />
            <Row>
              <Col span={12}>
                <Title level={3}>Material</Title>
                <Text>{fetchProduct.itemMaterial}</Text>
              </Col>
              <Col span={12}>
                <Title level={3}>Finish</Title>
                <Text>{fetchProduct.itemFinish}</Text>
              </Col>
            </Row>
          </Col>
          <Row style={{ marginTop: 20, width: "100%" }}>
            <Col span={24}>
              <Title level={4}>Dimensions</Title>
              <Table pagination={false} columns={columns} dataSource={data} />
            </Col>
          </Row>
        </Row>
      </Row>
    </>
  );
}

export default ProductPage;
