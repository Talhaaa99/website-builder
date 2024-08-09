'use client';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Sidebar from './_components/sidebar';

const MainNav = dynamic(() => import('./_components/main-nav'), { ssr: false });
const Editor = dynamic(() => import('./_components/editor'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background`}
    >
      <MainNav />
      <Editor />
      <Sidebar />
    </div>
  );
};

export default Home;
