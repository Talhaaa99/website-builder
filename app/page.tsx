import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false });
const PropertiesPanel = dynamic(() => import('../components/PropertiesPanel'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Editor />
      <PropertiesPanel />
    </div>
  );
};

export default Home;
