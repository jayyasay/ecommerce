import axios from "axios";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Input, Typography, message, Col, Row, InputNumber } from "antd";

function FormUpdate({ handleRefresh }) {
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
    itemPrice: "",
    itemWidth: "",
    itemHeight: "",
    itemLength: "",
    itemMaterial: "",
    itemFinish: "",
    itemProductionDays: "",
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
    data.append("itemPrice", formData.itemPrice);
    data.append("itemWidth", formData.itemWidth);
    data.append("itemHeight", formData.itemHeight);
    data.append("itemLength", formData.itemLength);
    data.append("itemMaterial", formData.itemMaterial);
    data.append("itemFinish", formData.itemFinish);
    data.append("itemProductionDays", formData.itemProductionDays);
    data.append("itemImage", formData.itemImage);

    axios
      .post("https://dancing-seahorse-92f9d7.netlify.app/api/db/products", data)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Data Submitted",
        });
        reset({ ...formData });
        handleRefresh();
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
                    message: "Field is required",
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
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <Input.TextArea name="itemDesc" style={formStyle} />
              </Form.Item>
              <Form.Item
                name="itemQuantity"
                label="Item Quantity"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <Input name="itemQuantity" style={formStyle} />
              </Form.Item>
              <Form.Item
                name="itemPrice"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <Input name="itemPrice" style={formStyle} />
              </Form.Item>
              <Form.Item
                label="Dimensions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form.Item
                  name="itemWidth"
                  label="W"
                  rules={[
                    {
                      required: true,
                      message: "Field is required",
                    },
                  ]}
                  onChange={handleChange}
                >
                  <Input name="itemWidth" style={formStyle} />
                </Form.Item>
                <Form.Item
                  name="itemHeight"
                  label="H"
                  rules={[
                    {
                      required: true,
                      message: "Field is required",
                    },
                  ]}
                  onChange={handleChange}
                >
                  <Input name="itemHeight" style={formStyle} />
                </Form.Item>
                <Form.Item
                  name="itemLength"
                  label="L"
                  rules={[
                    {
                      required: true,
                      message: "Field is required",
                    },
                  ]}
                  onChange={handleChange}
                >
                  <Input name="itemLength" style={formStyle} />
                </Form.Item>
              </Form.Item>
              <Form.Item
                name="itemMaterial"
                label="Material used"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <Input.TextArea name="itemMaterial" style={formStyle} />
              </Form.Item>
              <Form.Item
                name="itemFinish"
                label="Finish"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <Input.TextArea name="itemFinish" style={formStyle} />
              </Form.Item>
              <Form.Item
                name="itemProductionDays"
                label="Production Days"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
                onChange={handleChange}
              >
                <InputNumber name="itemProductionDays" style={formStyle} />
              </Form.Item>
              <Form.Item
                label="Upload image"
                rules={[
                  {
                    required: true,
                    message: "Missing image",
                  },
                ]}
              >
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
