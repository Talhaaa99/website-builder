import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';
import Sidebar from './_components/sidebar';
import Editor from './_components/editor';

const MainNav = dynamic(() => import('./_components/main-nav'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background">
      <MainNav />
      <Sidebar />
      <Editor />
    </div>
  );
};

export default Home;
