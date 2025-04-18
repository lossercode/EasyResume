import { Menu } from 'antd';
import {
  SettingOutlined,
  BookOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const Sider = () => {
  return (
    <Menu
      mode="inline"
      style={{ border: 'none' }}
      items={[
        {
          key: 'model-settings',
          icon: <SettingOutlined />,
          label: '模型设置',
          style: { borderRadius: 4 },
        },
        {
          key: 'knowledge-base',
          icon: <BookOutlined />,
          label: '知识库',
          style: { borderRadius: 4 },
        },
        {
          key: 'logs',
          icon: <FileTextOutlined />,
          label: '日志',
          style: { borderRadius: 4 },
        },
      ]}
    />
  );
};

export default Sider;
