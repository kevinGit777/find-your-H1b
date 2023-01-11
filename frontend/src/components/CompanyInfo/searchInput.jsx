import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";


export const searchInput = () => {
//   const [form] = Form.useForm();

  const handleSubmit = (values) => {
    alert(values.A);
  };

  return (
    <Form  layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Field A" name="A" tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Field B"
        name="B"
        tooltip={{
          title: "This is an optional field",
          icon: <InfoCircleOutlined />
        }}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
