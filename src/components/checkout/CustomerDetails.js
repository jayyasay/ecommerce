import { Select, Form, Input } from "antd";

const { Option } = Select;

function CustomerDetails() {
  return (
    <>
      <Form
        name="control-ref"
        //   onFinish={onFinish}
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
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

export default CustomerDetails;
