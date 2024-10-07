import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const Calcom = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'quick-chat' });
      cal('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Cal
      namespace="quick-chat"
      calLink="nezdemkovski/quick-chat"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  );
};

export default Calcom;
