import Header from './components/header';
import Sider from './components/sider';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-[rgba(233,236,240,1)] p-4">
        <Header />
      </header>
      <div className="flex flex-1">
        <aside className="border-r border-[rgba(233,236,240,1)] w-64 p-4">
          <Sider />
        </aside>
        <main className="flex-1 p-4">Content</main>
      </div>
    </div>
  );
};

export default Home;
