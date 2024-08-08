import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

const MainNav = dynamic(() => import('./_components/MainNav'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[20] overflow-hidden bg-background">
      <MainNav />
    </div>
  );
};

export default Home;
