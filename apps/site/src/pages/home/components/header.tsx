import { Avatar } from 'antd';

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 justify-center">
        <a className="flex" href="/">
          <img src="/logo_48.png" className="w-8" alt="logo" />
          <h1 className="font-semibold text-xl">EasyResume</h1>
        </a>
      </div>
      <div>
        <a href="/account" className="flex">
          <Avatar />
        </a>
      </div>
    </div>
  );
};

export default Header;
