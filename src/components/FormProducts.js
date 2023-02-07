import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Input,
  Typography,
  message,
  Layout,
  theme,
  Space,
  Card,
  Col,
  Row,
  Modal,
} from "antd";
import { Buffer } from "buffer";

function FormProducts() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Sider, Content } = Layout;

  const [messageApi, contextHolder] = message.useMessage();

  const [formReset] = Form.useForm();

  const { Title } = Typography;

  const { reset, register, handleSubmit } = useForm();

  const formStyle = {
    input: {
      textAlign: "left",
    },
  };
  const [formData, setFormData] = useState({
    itemName: "",
    itemDesc: "",
    itemQuantity: "",
    itemImage: null,
  });

  const [fetchProducts, setFetchProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleDelete = (productToDelete) => {
    setProductToDelete(productToDelete);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOk = async (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3001/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        productList();
      });
  };

  const productList = async () => {
    axios.get("http://localhost:3001/api/db/products").then((res) => {
      setFetchProducts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    productList();
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("itemName", formData.itemName);
    data.append("itemDesc", formData.itemDesc);
    data.append("itemQuantity", formData.itemQuantity);
    data.append("itemImage", formData.itemImage);

    axios
      .post("http://localhost:3001/api/db/products", data)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Data Submitted",
        });
        reset({ ...formData });
        productList();
      })
      .catch((err) => {
        console.log(err);
      });
    formReset.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Layout hasSider>
          <Sider
            width={500}
            style={{
              width: "600px",
              background: colorBgContainer,
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 64,
              bottom: 0,
            }}
          >
            <Col>
              <Row justify="center">
                <Col>
                  <Title>Input your products</Title>
                  <Card
                    style={{
                      width: 500,
                    }}
                  >
                    <Form
                      form={formReset}
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        maxWidth: 600,
                      }}
                      onFinish={handleSubmit(onSubmit)}
                      autoComplete="off"
                    >
                      <Form.Item
                        name="itemName"
                        label="Item name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                        onChange={handleChange}
                      >
                        <Input name="itemName" style={formStyle} />
                      </Form.Item>
                      <Form.Item
                        name="itemDesc"
                        label="Item description"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                        onChange={handleChange}
                      >
                        <Input name="itemDesc" style={formStyle} />
                      </Form.Item>
                      <Form.Item
                        name="itemQuantity"
                        label="Item Quantity"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                        onChange={handleChange}
                      >
                        <Input name="itemQuantity" style={formStyle} />
                      </Form.Item>
                      <Form.Item label="Upload image">
                        <input
                          type="file"
                          {...register("itemImage")}
                          onChange={handleUpload}
                          required
                        />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: 520,
            }}
          >
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              {fetchProducts &&
                fetchProducts.map((product, index) => (
                  <Card key={index}>
                    <Space direction="vertical">
                      <Space wrap>
                        <Button type="primary">Edit</Button>
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
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Card>
                ))}
              <Modal
                title="Confirm delete"
                visible={showModal}
                onCancel={handleCancel}
                onOk={handleOk}
              >
                <p>Are you sure you want to delete this product?</p>
              </Modal>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FormProducts;
