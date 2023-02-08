import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Input,
  Typography,
  message,
  Col,
  Row,
} from "antd";

function FormUpdate() {

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

  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState({
    itemNameEdit: "",
    itemDescEdit: "",
    itemQuantityEdit: "",
    itemImage: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

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
      })
      .catch((err) => {
        console.log(err);
      });
    formReset.resetFields();
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
}

export default FormUpdate;
