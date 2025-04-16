import { Sender } from '@ant-design/x';
import { Col, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

export default function Interaction() {
  const [userPrompt, setUserPrompt] = useState<string>();
  const [rag, setRag] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRagSelect = (e: string) => {
    setRag(e);
  };

  const handlePromptSubmit = () => {
    setLoading(true);
    setUserPrompt('');
    setRag(null); // 每次问问题都可能需要不同的知识库，所以需要清空
    // TODO: send prompt to background script
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Row className="pb-4" align={'middle'}>
        <Col span={4}>
          <span>知识库</span>
        </Col>
        <Col span={20}>
          <Select
            value={rag}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
            className="w-full"
            onChange={handleRagSelect}
          />
        </Col>
      </Row>
      <Sender
        loading={loading}
        value={userPrompt}
        onChange={(v) => {
          setUserPrompt(v);
        }}
        onSubmit={handlePromptSubmit}
        onCancel={() => {
          setLoading(false);
        }}
        autoSize={{ minRows: 2, maxRows: 6 }}
        placeholder="请输入您的prompt"
      />
      <div className="pt-4">
        <TextArea placeholder="运行结果" />
      </div>
    </>
  );
}
