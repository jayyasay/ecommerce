import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Spin, Typography, InputNumber } from "antd";
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
        itemPrice: res.data.itemPrice,
        itemWidth: res.data.itemWidth,
        itemHeight: res.data.itemHeight,
        itemLength: res.data.itemLength,
        itemMaterial: res.data.itemMaterial,
        itemFinish: res.data.itemFinish,
        itemProductionDays: res.data.itemProductionDays,
      });
    });
  };

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
    data.append("itemPrice", formData.itemPrice);
    data.append("itemWidth", formData.itemWidth);
    data.append("itemHeight", formData.itemHeight);
    data.append("itemLength", formData.itemLength);
    data.append("itemMaterial", formData.itemMaterial);
    data.append("itemFinish", formData.itemFinish);
    data.append("itemProductionDays", formData.itemProductionDays);
    // data.append("itemImage", formData.itemImage);
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
    setSpin(false);
    formReset.setFieldsValue({
      itemName: formData.itemName,
      itemDesc: formData.itemDesc,
      itemQuantity: formData.itemQuantity,
      itemPrice: formData.itemPrice,
      itemWidth: formData.itemWidth,
      itemHeight: formData.itemHeight,
      itemLength: formData.itemLength,
      itemMaterial: formData.itemMaterial,
      itemFinish: formData.itemFinish,
      itemProductionDays: formData.itemProductionDays,
    });
  }, [
    formReset,
    formData.itemName,
    formData.itemDesc,
    formData.itemQuantity,
    formData.itemPrice,
    formData.itemWidth,
    formData.itemHeight,
    formData.itemLength,
    formData.itemMaterial,
    formData.itemFinish,
    formData.itemProductionDays,
  ]);

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
              <Input.TextArea name="itemDesc" style={formStyle} />
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
            <Form.Item
              name="itemPrice"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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
                    message: "Please input your username!",
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
                    message: "Please input your username!",
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
                    message: "Please input your username!",
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
                  message: "Please input your username!",
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
                  message: "Please input your username!",
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
                  message: "Please input your username!",
                },
              ]}
              onChange={handleChange}
            >
              <InputNumber name="itemProductionDays" style={formStyle} />
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
