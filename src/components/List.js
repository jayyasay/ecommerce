import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Input,
  message,
  Layout,
  Space,
  Card,
  Modal,
  Pagination,
} from "antd";
import { Buffer } from "buffer";

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { Content } = Layout;

  const [messageApi] = message.useMessage();

  const [formReset] = Form.useForm();

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
    // itemImage: null,
  });

  const [fetchProducts, setFetchProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState({
    itemNameEdit: "",
    itemDescEdit: "",
    itemQuantityEdit: "",
    // itemImage: null,
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
      .delete(`http://localhost:3001/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        productList();
      });
  }, [productToDelete]);

  const handleEdit = useCallback(async (productId) => {
    setFormData({});
    console.log(productId);
    await axios
      .get(`http://localhost:3001/api/db/products/${productId}`)
      .then((res) => {
        setFormData({
          itemName: res.data.itemName,
          itemDesc: res.data.itemDesc,
          itemQuantity: res.data.itemQuantity,
          // itemImage: res.data.itemImage,
        });
      });
    setProductToEdit(productId);
    setShowModalEdit(true);
  }, []);

  const handleCancelEdit = () => {
    formReset.resetFields();
    console.log(formData);
    setShowModalEdit(false);
  };

  const productList = () => {
    axios.get("http://localhost:3001/api/db/products").then((res) => {
      setFetchProducts(res.data);
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
    // data.append("itemImage", formData.itemImage);

    await axios
      .put(`http://localhost:3001/api/db/products/${productToEdit}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        productList();
      })
      .then((res) => {
        setShowModal(false);
        productList();
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModalEdit(false);
  };

  return (
    <>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={fetchProducts.length}
        pageSize={productsPerPage}
        onChange={paginate}
        style={{ marginTop: "1em", textAlign: "center" }}
      />
      <Content style={{ margin: "0 16px 0", overflow: "initial" }}>
        {currentProducts.map((product) => (
          <Card key={product._id}>
            <Space direction="vertical">
              <Space wrap>
                <Button type="primary" onClick={() => handleEdit(product._id)}>
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
          footer={null}
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
            {/* <input
              type="input"
              {...register("itemName")}
              onChange={handleChange}
              value={formData.itemName}
            />
            <input
              type="input"
              {...register("itemDesc")}
              onChange={handleChange}
              value={formData.itemDesc}
            />
            <input
              type="input"
              {...register("itemQuantity")}
              onChange={handleChange}
              value={formData.itemQuantity}
            /> */}
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
              initialValue={formData.itemName}
            >
              <Input name="itemName" style={formStyle}/>
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
              initialValue={formData.itemDesc}
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
              initialValue={formData.itemQuantity}
            >
              <Input name="itemQuantity" style={formStyle} />
            </Form.Item>
            {/* <Form.Item label="Upload image">
              <input
                type="file"
                {...register("itemImage")}
                onChange={handleUpload}
                required
              />
            </Form.Item> */}
            <Form.Item
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 24,
              }}
              className="center"
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </>
  );
}

export default List;
