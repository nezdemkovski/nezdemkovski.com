import { headers } from 'next/headers';

import StructuredText from '@/components/StructuredText';
import { DatoCMSData } from '../api/contact-info/route';

export const revalidate = 10;

const Info = ({ title, subtitle, content }: DatoCMSData['data']['rule']) => {
  return (
    <div className="relative overflow-hidden py-16 dark:text-white">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1 className="mt-2 block text-center font-unbounded text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h1>
        </div>

        <StructuredText
          // @ts-ignore
          content={content}
        />
      </div>
    </div>
  );
};

const ContactPage = async () => {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const response = await fetch(`${protocol}://${host}/api/contact-info`, {
    next: { revalidate: 10 },
  });
  const {
    data: { rule },
  }: DatoCMSData = await response.json();

  return <Info {...rule} />;
};

export default ContactPage;
