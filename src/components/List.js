import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Input,
  Layout,
  Space,
  Card,
  Modal,
  Pagination,
  Row,
  Col,
  Spin,
} from "antd";
import { Buffer } from "buffer";

function List({ refresh }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { Content } = Layout;

  const [fetchProducts, setFetchProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [spin, setSpin] = useState(false);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = fetchProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (productToDelete) => {
    setProductToDelete(productToDelete);
    setShowModal(true);
  };

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleOk = useCallback(() => {
    axios
      .delete(`http://localhost:3001/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        const remainingProducts = fetchProducts.filter(
          (product) => product._id !== productToDelete
        );
        setFetchProducts(remainingProducts);
        if (remainingProducts.length % 8 === 0) {
          setCurrentPage(currentPage - 1);
        }
        if (remainingProducts.length === 0) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
  }, [productToDelete, fetchProducts, currentPage]);

  const handleEdit = useCallback(async (productId) => {
    navigate(`/edit/${productId}`);
  }, []);

  const productList = () => {
    axios.get("http://localhost:3001/api/db/products").then((res) => {
      setSpin(true);
      setFetchProducts(res.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      productList();
    }, 1000);
  }, [refresh]);

  return (
    <>
      {currentProducts.length !== 0 && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={fetchProducts.length}
          pageSize={productsPerPage}
          onChange={paginate}
          style={{ marginTop: "1em", textAlign: "center" }}
        />
      )}
      <Content
        style={{ margin: "0 16px 0", overflow: "hidden", position: "relative" }}
      >
        {currentProducts.length === 0 ? (
          <Row
            align="middle"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
            }}
          >
            {!spin ? (
              <Col>
                <Spin tip="Loading..." />
              </Col>
            ) : (
              "No products available"
            )}
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            {currentProducts.map((product) => (
              <Col span={6} key={product._id}>
                <Card>
                  <Space direction="vertical">
                    <Space wrap className="button-modal">
                      <Button
                        type="primary"
                        onClick={() => handleEdit(product._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </Space>
                  </Space>
                  <p>{product.itemName}</p>
                  <p>{product.itemDesc}</p>
                  <p>{product.itemQuantity}</p>
                  <img
                    alt=""
                    src={`data:image/jpg;base64,${Buffer.from(
                      product.itemImage.data.data
                    ).toString("base64")}`}
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Modal
        forceRender
        title="Confirm delete"
        open={showModal}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
}

export default List;
