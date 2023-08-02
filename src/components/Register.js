import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { Link } from "react-router-dom";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();

  const { Title } = Typography;

  const [form] = Form.useForm();

  const formStyle = {
    input: {
      textAlign: "left",
    },
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    axios
      .post("https://ecommerce-olive-delta.vercel.app/api/db/registrations", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Data Submitted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col>
          <Title>Registration</Title>
          <Card
            style={{
              width: 500,
            }}
          >
            <Form
              form={form}
              labelCol={{
                span: 8,
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
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
                style={formStyle.input}
              >
                <Input
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  value={formData.name}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  name="email"
                  placeholder="Enter valid email address"
                  onChange={handleChange}
                  value={formData.email}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your age!",
                  },
                ]}
                style={formStyle.input}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="medium">
                  Submit
                </Button>
                <Button type="link">
                  <Link to="/">Login</Link>
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
