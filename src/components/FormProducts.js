import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";

function FormProducts() {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const { Title } = Typography;

  const [form] = Form.useForm();

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    const [file] = fileList;
    setFormData({ ...formData, itemImage: file });
  };

  const onFinish = async () => {
    const data = new FormData();
    data.append("itemImage", formData.itemImage);
    data.append("itemName", formData.itemName);
    data.append("itemDesc", formData.itemDesc);
    data.append("itemQuantity", formData.itemQuantity);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/db/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      form.resetFields();
    } catch (err) {
      console.log(err.data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      <Col>
        <Title>Input your products</Title>
        <Card
          style={{
            width: 500,
          }}
        >
          <Form
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: "100%",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            encType="multipart/form-data"
            method="POST"
          >
            <Form.Item
              label="Item name"
              name="itemName"
              rules={[
                {
                  required: true,
                  message: "Please input your product's name!",
                },
              ]}
              style={formStyle.input}
            >
              <Input
                name="itemName"
                placeholder="input placeholder"
                onChange={handleChange}
                value={formData.itemName}
              />
            </Form.Item>
            <Form.Item
              label="Item description"
              name="itemDesc"
              rules={[
                {
                  required: true,
                  message: "Please input your product's name!",
                },
              ]}
              style={formStyle.input}
            >
              <Input
                name="itemDesc"
                placeholder="input placeholder"
                onChange={handleChange}
                value={formData.itemDesc}
              />
            </Form.Item>
            <Form.Item
              label="Item quantity"
              name="itemQuantity"
              rules={[
                {
                  required: true,
                  message: "Please input your product's name!",
                },
              ]}
              style={formStyle.input}
            >
              <Input
                name="itemQuantity"
                placeholder="input placeholder"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Upload" getValueFromEvent={normFile}
                valuePropName="fileList">
              <Upload
                name="testImage"
                listType="picture"
                beforeUpload={() => false}
                onChange={handleUpload}
                accept="image/png"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            {/* <Form.Item label="Item image" name="itemImage">
              <Form.Item label="Upload" valuePropName="fileList">
                <Upload
                  action="http://localhost:3001/api/db/products"
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    ></div>
                  </div>
                </Upload>
              </Form.Item>
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" size="medium">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default FormProducts;
