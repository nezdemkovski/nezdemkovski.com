'use client';

import { DatoCMSData } from '@/app/api/contact-info/route';
import { StructuredText } from 'react-datocms';

const StructuredTextWrapper = ({
  content,
}: DatoCMSData['data']['rule']['content']) => (
  <div className="prose prose-lg prose-neutral prose-indigo mx-auto mt-6 font-iawriterquattro text-gray-900 dark:prose-green dark:text-white">
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
