import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function EditItem() {
  const { id } = useParams();

  const { Title } = Typography;

  const { TextArea } = Input;

  const navigate = useNavigate();

  const [formReset] = Form.useForm();

  const { handleSubmit } = useForm();

  const productList = () => {
    axios.get(`http://localhost:3001/api/db/products/${id}`).then((res) => {
      setFormData({
        itemName: res.data.itemName,
        itemDesc: res.data.itemDesc,
        itemQuantity: res.data.itemQuantity,
      });
      console.log(res.data);
    });
  };

  const [formData, setFormData] = useState({
    itemName: "",
    itemDesc: "",
    itemQuantity: "",
    // itemImage: null,
  });

  const [spin, setSpin] = useState(false);
  const toggleSpin = (checked) => {
    setSpin(checked);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("itemName", formData.itemName);
    data.append("itemDesc", formData.itemDesc);
    data.append("itemQuantity", formData.itemQuantity);
    // data.append("itemImage", formData.itemImage);

    await axios
      .put(`http://localhost:3001/api/db/products/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSpin(true);
        setTimeout(() => {
          navigate("/item-list");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formStyle = useMemo(
    () => ({
      input: {
        textAlign: "left",
      },
    }),
    []
  );

  useEffect(() => {
    productList();
  }, []);

  useEffect(() => {
    setSpin(false)
    formReset.setFieldsValue({
      itemName: formData.itemName,
      itemDesc: formData.itemDesc,
      itemQuantity: formData.itemQuantity,
    });
  }, [formReset, formData.itemName, formData.itemDesc, formData.itemQuantity]);

  return (
    <>
        <Spin spinning={spin} size="large">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
            <Title>Editing item {formData.itemName}</Title>
            <Form
              form={formReset}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={handleSubmit(onSubmit)}
              autoComplete="off"
              style={{
                width: "800px",
              }}
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
                initialValue={formData.itemName}
              >
                <Input name="itemName" style={formStyle} />
              </Form.Item>
              <Form.Item
                label="Item Description"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                name="itemDesc"
              >
                <TextArea
                  showCount
                  maxLength={100}
                  style={{
                    height: 120,
                    resize: "none",
                  }}
                  placeholder="Item description"
                  name="itemDesc"
                  onChange={handleChange}
                />
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
          </div>
        </Spin>
    </>
  );
}

export default EditItem;
