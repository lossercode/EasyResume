import { CloudUploadOutlined } from '@ant-design/icons';
import { Attachments } from '@ant-design/x';
import { Button, Form, Input, Select } from 'antd';
import { debounce } from '../utils/tools';
import { useState } from 'react';

const embeddingModelOptions = [
  { value: 'model1', label: 'Model 1' },
  { value: 'model2', label: 'Model 2' },
  { value: 'model3', label: 'Model 3' },
];

export default function RagForm() {
  const [form] = Form.useForm();
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // 监听表单值变化
  const onValuesChange = debounce(() => {
    console.log('Form values changed');
    form
      .validateFields()
      .then(() => setFormValid(true))
      .catch(() => setFormValid(false));
  }, 500);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // 这里可以添加表单提交逻辑
    setLoading(true);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      onChange={onValuesChange}
    >
      <Form.Item
        label="RAG名称"
        name="ragName"
        rules={[
          { required: true, message: '请输入RAG名称' },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '名称只能包含字母和数字',
          },
          { max: 12, message: '名称长度不能超过12个字符' },
        ]}
      >
        <Input placeholder="请输入RAG名称" />
      </Form.Item>

      <Form.Item
        label="Embedding Model"
        name="embeddingModel"
        rules={[{ required: true, message: '请选择Embedding Model' }]}
      >
        <Select
          placeholder="请选择Embedding Model"
          options={embeddingModelOptions}
        />

        <Attachments
          placeholder={{
            icon: <CloudUploadOutlined />,
            title: '上传文件',
            description: '仅支持PDF、TXT文件',
          }}
          accept=".pdf, .txt"
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!formValid}
            loading={loading}
          >
            确定
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
