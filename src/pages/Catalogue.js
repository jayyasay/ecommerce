import axios from "axios";
import {Link} from "react-router-dom"
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
            <Link to={`/edit/${product._id}`}>
            <Card
              extra={`${product.itemQuantity} ${product.itemQuantity === 1 ? 'item' : 'items'} left`}
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
              <p>{product.itemPrice}</p>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Catalogue;
