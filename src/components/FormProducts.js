import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Input, Typography, message, Layout, theme } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";

function FormProducts() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Sider, Content } = Layout;

  const [messageApi, contextHolder] = message.useMessage();

  const [formReset] = Form.useForm();

  const { Title } = Typography;

  const { reset, register, handleSubmit } = useForm();

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
        console.log(res);
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
        <Layout>
          <Sider
            width={600}
            style={{
              background: colorBgContainer,
            }}
          >
            <Col flex="600px">
              <Row justify="center">
                <Col>
                  <Title>Input your products</Title>
                  <Card
                    style={{
                      width: 500,
                    }}
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
                    {/* <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="itemName" onChange={handleChange}/>
            <input type="text" name="itemDesc" onChange={handleChange}/>
            <input type="number" name="itemQuantity" onChange={handleChange}/>
            <input type="file"  onChange={handleUpload}/>
            <input type="submit" value="Submit" />
          </form> */}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              style={{
                padding: 24,
                margin: "15px 0 0 0",
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FormProducts;
