'use client';
import { useEditorStore } from '@/store/editorStore';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';
import Editor from './_components/editor';
import Sidebar from './_components/sidebar';

const MainNav = dynamic(() => import('./_components/main-nav'), { ssr: false });

const Home: NextPage = () => {
  const { theme } = useEditorStore();
  return (
    <div
      className={`${theme} fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background`}
    >
      <MainNav />
      <Editor />
      <Sidebar />
    </div>
  );
};

export default Home;
