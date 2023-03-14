import { headers } from 'next/headers';

import BeautyBox from '@/components/BeautyBox';
import StructuredText from '@/components/StructuredText';
import { DatoCMSData } from '../api/contact-info/route';

export const revalidate = 10;

const Info = ({ title, subtitle, content }: DatoCMSData['data']['rule']) => {
  return (
    <div className="relative overflow-hidden py-16 dark:text-white">
      <BeautyBox />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-indigo-600">
              {subtitle}
            </span>
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl">
              {title}
            </span>
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
