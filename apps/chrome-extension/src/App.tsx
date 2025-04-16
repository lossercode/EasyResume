import {
  BookOutlined,
  OpenAIOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs } from 'antd';
import { useState } from 'react';
import Interaction from './interaction';
import Rag from './rag';
import Logo from './components/logo';
import Agent from './agent';

const items = [
  {
    key: 'agent',
    label: 'agent配置',
    icon: <OpenAIOutlined />,
    children: <Agent />,
  },
  {
    key: 'rag',
    label: 'RAG配置',
    children: <Rag />,
    icon: <BookOutlined />,
  },
  {
    key: 'interaction',
    label: 'agent运行',
    icon: <PlayCircleOutlined />,
    children: <Interaction />,
  },
];

export default function App() {
  const [popupTab, setPopupTab] = useState<string>('agent');
  const handleTabChange = (key: string) => {
    setPopupTab(key);
  };
  return (
    <>
      <div className="w-full p-2">
        <Logo />
        <Tabs
          defaultActiveKey="playground"
          activeKey={popupTab}
          items={items}
          onChange={handleTabChange}
        />
      </div>
    </>
  );
}
