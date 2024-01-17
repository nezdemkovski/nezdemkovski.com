import { getPortfolioItems } from '@/app/portfolio/utils';
import Markdown from 'react-markdown';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

const PortfolioPage = async () => {
  const { data } = await getPortfolioItems();

  if (!data) {
    return (
      <main className="m-6 mx-auto max-w-3xl">
        <h1 className="mb-10 font-unbounded text-3xl font-bold">
          Something bad happened. Refresh the page.
        </h1>
      </main>
    );
  }

  return (
    <main className="m-6 mx-auto max-w-3xl">
      <h1 className="mb-10 font-unbounded text-3xl font-bold">My Portfolio</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="mb-3 flex flex-col gap-1">
            <h3>{item.title}</h3>
            <img src={item?.image ?? ''} alt={`Image for ${item?.title ?? ''}`} />
            <div className="text-xs text-gray-400">{item?.tags?.join(', ') ?? ''}</div>
            <Markdown className="prose">{item.project_mdx}</Markdown>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PortfolioPage;
