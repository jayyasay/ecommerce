import { useState, useEffect } from "react";
import { Select, Form, Input, Button } from "antd";

const { Option } = Select;

function CustomerDetails(props) {

    const { customerDetails, setCustomerDetails } = props;

  const onFinish = (values) => {
    props.updateCustomerDetails(values);
  };

//   const handleChange = (event) => {
//     props.customerDetails({
//       [event.target.name]: event.target.value,
//     });
//   };

  return (
    <>
      <Form
        name="control-ref"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          margin: "50px auto",
        }}
      >
        <Form.Item
          name="customerName"
          label="Name"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
          ]}
          initialValue={customerDetails && customerDetails.customerName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerAddress1"
          label="Address Line 1"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
          ]}
          initialValue={customerDetails && customerDetails.customerAddress1}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerAddress2"
          label="Address Line 2"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
          ]}
          initialValue={customerDetails && customerDetails.customerAddress2}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerCity"
          label="City"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
          ]}
          initialValue={customerDetails && customerDetails.customerCity}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerCountry"
          label="Country"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
          ]}
          initialValue={customerDetails && customerDetails.customerCountry}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          style={{textAlign: "center"}}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CustomerDetails;
