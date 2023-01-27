import axios from "axios";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";

function TestForm() {
  const { Title } = Typography;

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
      [event.target.age]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/nameages", formData)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormData({
      name: "",
      age: "",
    });
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
            onSubmit={handleSubmit}
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
                placeholder="input placeholder"
                onChange={handleChange}
                value={formData.age}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="medium">
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default TestForm;
