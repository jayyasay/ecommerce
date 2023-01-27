import axios from "axios";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";

function TestForm() {
  const { Title } = Typography;

  const [form] = Form.useForm();

  const formStyle = {
    input: {
      textAlign: "left",
    },
  };
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = () => {
    axios
      .post("http://localhost:3001/api/nameages", formData)
      .then((res) => {
        console.log(res);
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
              span: 3,
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              style={formStyle.input}
            >
              <Input
                name="name"
                placeholder="input placeholder"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please input your age!",
                },
              ]}
              style={formStyle.input}
            >
              <Input
                name="age"
                placeholder="input placeholder"
                onChange={handleChange}
                value={formData.age}
              />
            </Form.Item>
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

export default TestForm;
