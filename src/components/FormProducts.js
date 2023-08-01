import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
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
  Pagination
} from "antd";
import { Buffer } from "buffer";

function FormProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Sider, Content } = Layout;

  const [messageApi, contextHolder] = message.useMessage();

  const [formReset] = Form.useForm();

  const { Title } = Typography;

  const { reset, register, handleSubmit } = useForm();

  const formStyle = useMemo(
    () => ({
      input: {
        textAlign: "left",
      },
    }),
    []
  );
  const [formData, setFormData] = useState({
    itemName: "",
    itemDesc: "",
    itemQuantity: "",
    itemImage: null,
  });

  const [fetchProducts, setFetchProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState({
    itemNameEdit: "",
    itemDescEdit: "",
    itemQuantityEdit: "",
    itemImage: null,
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = fetchProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeEdit = (event) => {
    setProductToEdit({
      ...productToEdit,
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

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleOk = useCallback(() => {
    axios
      .delete(`https://dancing-seahorse-92f9d7.netlify.app1/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        productList();
      });
  }, [productToDelete]);

  const handleEdit = useCallback(async (productToEdit) => {
    await currentData(productToEdit);
    setShowModalEdit(true);
  }, []);

  // const handleCancel = () => {
  //   setShowModal(false);
  // };

  const handleCancelEdit = () => {
    setShowModalEdit(false);
  };

  // const handleOk = async (id) => {
  //   console.log(id);
  //   axios
  //     .delete(`https://dancing-seahorse-92f9d7.netlify.app1/api/db/products/${productToDelete}`)
  //     .then((res) => {
  //       setShowModal(false);
  //       productList();
  //     });
  // };

  const handleOkEdit = async (id) => {
    console.log(id);
    axios
      .delete(`https://dancing-seahorse-92f9d7.netlify.app1/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        productList();
      });
  };

  // const handleEdit = async (productToEdit) => {
  //   await currentData(productToEdit);
  //   setShowModalEdit(true);
  // };

  const currentData = async (id) => {
    await axios
      .get(`https://dancing-seahorse-92f9d7.netlify.app1/api/db/products/${id}`)
      .then((res) => {
        setProductToEdit({
          itemNameEdit: res.data.itemName,
          itemDescEdit: res.data.itemDesc,
          itemQuantityEdit: res.data.itemQuantity,
          itemImageEdit: res.data.itemImage,
        });
      });
  };

  const productList = async () => {
    axios.get("https://dancing-seahorse-92f9d7.netlify.app1/api/db/products").then((res) => {
      setFetchProducts(res.data);
    });
  };

  useEffect(() => {
    const productList = async () => {
      const res = await axios.get("https://dancing-seahorse-92f9d7.netlify.app1/api/db/products");
      setFetchProducts(res.data);
    };
    productList();
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("itemName", formData.itemName);
    data.append("itemDesc", formData.itemDesc);
    data.append("itemQuantity", formData.itemQuantity);
    data.append("itemImage", formData.itemImage);

    axios
      .post("https://dancing-seahorse-92f9d7.netlify.app1/api/db/products", data)
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
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Col>
              <Row justify="center">
                <Col>
                  <Title>Input your products</Title>
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
                </Col>
              </Row>
            </Col>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: 0,
            }}
          >
            <Pagination
              defaultCurrent={1}
              total={fetchProducts.length}
              pageSize={productsPerPage}
              onChange={paginate}
              style={{ marginTop: '1em', textAlign: 'center' }}
            />
            <Content style={{ margin: "0 16px 0", overflow: "initial" }}>
            {currentProducts.map((product) => (
              <Card key={product._id}>
              <Space direction="vertical">
                <Space wrap>
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
                  maxWidth: "300px",
                }}
              />
            </Card>
            ))}
              <Modal
                title="Confirm delete"
                open={showModal}
                onCancel={handleCancel}
                onOk={handleOk}
              >
                <p>Are you sure you want to delete this product?</p>
              </Modal>

              <Modal
                title="Edit item"
                open={showModalEdit}
                onCancel={handleCancelEdit}
                onOk={handleOkEdit}
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
                    name="itemNameEdit"
                    label="Item name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    onChange={handleChangeEdit}
                    initialValue={productToEdit.itemNameEdit}
                  >
                    <Input name="itemNameEdit" style={formStyle} />
                  </Form.Item>
                  <Form.Item
                    name="itemDescEdit"
                    label="Item description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    onChange={handleChangeEdit}
                    initialValue={productToEdit.itemDescEdit}
                  >
                    <Input name="itemDescEdit" style={formStyle} />
                  </Form.Item>
                  <Form.Item
                    name="itemQuantityEdit"
                    label="Item Quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    onChange={handleChangeEdit}
                    initialValue={productToEdit.itemQuantityEdit}
                  >
                    <Input name="itemQuantityEdit" style={formStyle} />
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
                  ></Form.Item>
                </Form>
              </Modal>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FormProducts;
