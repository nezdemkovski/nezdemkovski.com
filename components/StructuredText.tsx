'use client';

import { DatoCMSData } from '@/app/api/contact-info/route';
import { StructuredText } from 'react-datocms';

const StructuredTextWrapper = ({
  content,
}: DatoCMSData['data']['rule']['content']) => (
  <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500 dark:prose-green dark:text-gray-400">
    <StructuredText
      // @ts-ignore
      data={content}
      metaTransformer={({ meta }) =>
        meta.reduce((o, key) => ({ ...o, [key.id]: key.value }), {})
      }
    />
  </div>
);

export default StructuredTextWrapper;
