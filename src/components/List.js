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

  const handleEdit = useCallback(async (productToEdit) => {
    await currentData(productToEdit);
    setShowModalEdit(true);
  }, []);

  const handleCancelEdit = () => {
    setProductToEdit({
      ...productToEdit,
      itemNameEdit: "hehe",
      itemDescEdit: "hehe",
      itemQuantityEdit: "hehe",
      itemImageEdit: null,
    });
    console.log(productToEdit);
    setShowModalEdit(false);
  };

  const handleOkEdit = async (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3001/api/db/products/${productToDelete}`)
      .then((res) => {
        setShowModal(false);
        productList();
      });
  };

  const currentData = async (id) => {
    await axios
      .get(`http://localhost:3001/api/db/products/${id}`)
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
    </>
  );
}

export default List;
