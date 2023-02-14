import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { Buffer } from "buffer";

function Catalogue() {
  const { Meta } = Card;

  const { Title } = Typography;

  const [fetchProducts, setFetchProducts] = useState([]);

  const fetchAllProducts = () => {
    axios.get("http://localhost:3001/api/db/products").then((res) => {
      setFetchProducts(res.data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Row style={{ maxWidth: "1020px", margin: "auto" }} gutter={20}>
        <Title>Browse our catalogue</Title>
        <Title level={3}>
          Elevate your space with our premium wooden products, crafted with
          exquisite attention to detail and a timeless aesthetic.
        </Title>
        {fetchProducts.map((product) => (
          <Col span={8} flex style={{ gap: 0 }}>
            <Card
              extra={`${product.itemQuantity} items left`}
              hoverable
              style={{
                maxWidth: 400,
              }}
              cover={
                <img
                  alt="example"
                  src={`data:image/jpg;base64,${Buffer.from(
                    product.itemImage.data.data
                  ).toString("base64")}`}
                  style={{ width: "100%", maxHeight: 500 }}
                />
              }
            >
              <Meta title={product.itemName} description={product.itemDesc} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Catalogue;
