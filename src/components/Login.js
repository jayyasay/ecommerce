import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { Link } from "react-router-dom";

function Login() {
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
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = () => {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("http://localhost:3001/api/db/login", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer secret",
        },
      })
      .then((res) => {
        if (res.data.auth) {
          localStorage.setItem("token", res.data.token);
          messageApi.open({
            type: "success",
            content: "Login successfully. Please wait...",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          messageApi.open({
            type: "error",
            content: "Incorrect email or password",
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Error logging in, please try again",
        });
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
          <Title> Login </Title>
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
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
                style={formStyle.input}
              >
                <Input
                  name="email"
                  placeholder="Enter your email"
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
                    message: "Please input your correct password",
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
                  <Link to="/register">Register</Link>
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
