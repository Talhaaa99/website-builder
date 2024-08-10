'use client';
import { NextPage } from 'next';
import Sidebar from './_components/sidebar';
import Editor from './_components/editor';
import MainNav from './_components/main-nav';

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
