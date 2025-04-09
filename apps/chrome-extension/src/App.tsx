import { OpenAIOutlined, SettingOutlined } from "@ant-design/icons";
import PopupItem, { PopupItemProps } from "./components/popup/item";
import { Button, Spin } from "antd";
import { useState } from "react";

const popupItem: PopupItemProps[] = [
  {
    icon: <SettingOutlined />, title: "个人信息维护", onclick: () => {
      chrome.tabs.create({ url: 'https://www.baidu.com' });
    }
  },
  {
    icon: <OpenAIOutlined />, title: "AI信息注入", onclick: () => {
      
    }
  },
]
export default function App() {

  const [loading, setLoading] = useState<boolean>(false);

  const handleSiteClick = async () => {
    await chrome.tabs.create({url: 'https://www.baidu.com'});
  }

  const handleAiClick = async () => {
    setLoading(true); 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        files: ['./scripts/content.js']
      });
    });
  }
  return (
    <div className="w-48 p-2">

      <div className="flex items-center gap-2 mb-2 justify-between p-2 border-b border-[#e8f3ff]">
        <img src="logo.svg" className="w-6 h-6" />
        <Button onClick={handleSiteClick}>登录</Button>
      </div>

      <div className="flex flex-row items-center justify-start gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-md">
            <SettingOutlined />
            <div className="text-sm font-medium cursor-pointer" onClick={handleSiteClick}>个人信息维护</div>
        </div>

        <div className="flex flex-row items-center justify-start gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-md">
            <OpenAIOutlined />
            <div className="text-sm font-medium cursor-pointer" onClick={handleAiClick}>AI自动信息注入</div>
            <Spin size='small' spinning={loading}/>
        </div>
    </div>
  );
}