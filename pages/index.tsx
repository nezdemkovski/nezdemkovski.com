import { NextPage } from 'next';

interface Props {}

const IndexPage: NextPage<Props> = () => {
  return (
    <div className="px-4 bg-white dark:bg-black">
      <div className="flex items-center justify-center h-screen">
        <span className="text-black dark:text-white">yuri.works</span>
      </div>
    </div>
  );
};

export default IndexPage;
