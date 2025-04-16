import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { debounce } from '../utils/tools';

interface AgentFormValues {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export default function Agent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // 监听表单值变化
  const onValuesChange = debounce(() => {
    console.log('Form values changed');
    form
      .validateFields()
      .then(() => setFormValid(true))
      .catch(() => setFormValid(false));
  }, 500);

  const onFinish = (values: AgentFormValues) => {
    console.log('Received values of form: ', values);
    message.success('success');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onChange={onValuesChange}
    >
      <Form.Item
        label="Base Url"
        name="baseUrl"
        rules={[
          { required: true, message: '请输入Base Url' },
          {
            pattern: /^https:\/\/[^\s$.?#].[^\s]*$/,
            message: '请输入以https开头的合法URL',
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="API Key"
        name="apiKey"
        rules={[{ required: true, message: '请输入API Key' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: '请输入Model' }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!formValid}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
