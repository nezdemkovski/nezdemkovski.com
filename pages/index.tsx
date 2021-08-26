import { NextPage } from 'next';
import Link from 'next/link';
import { useClipboard } from 'use-clipboard-copy';

import Notification from '../components/Notification';
import Alert from '@components/Alert';
import NavBar from '@components/NavBar';

const data = {
  fullName: 'Yuri Yakovlev',
  occupation: 'JavaScript developer',
  company: {
    regNumberTitle: 'Company registration number (IČO)',
    regNumber: '07605901',
    vatNumberTitle: 'VAT registration number (DIČ)',
    vatNumber: 'CZ8911274350',
  },
};

interface Props {}

const MainContent = () => {
  const companyRegNumberClipboard = useClipboard({ copiedTimeout: 1000 });
  const companyVatNumberClipboard = useClipboard({ copiedTimeout: 1000 });

  return (
    <>
      <main>
        <div className="mx-auto pt-28 sm:pt-60 max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold leading-10 text-center text-mulled-wine dark:text-white sm:text-7xl sm:truncate font-lionandhare-bold">
            {data.fullName}
          </h1>
          <p className="mt-2 mb-10 text-xl text-center sm:text-3xl text-mulled-wine dark:text-gray-400 font-lionandhare-bold-italic">
            {data.occupation}
          </p>

          <div className="mt-6 mb-2 text-sm text-center sm:text-base text-mulled-wine dark:text-gray-400">
            <p>{data.company.regNumberTitle}:</p>
            <p
              onClick={() =>
                companyRegNumberClipboard.copy(data.company.regNumber)
              }
              className="cursor-pointer"
            >
              <b>{data.company.regNumber}</b>
            </p>
          </div>

          <div className="mb-2 text-sm text-center sm:text-base text-mulled-wine dark:text-gray-400">
            <p>{data.company.vatNumberTitle}:</p>
            <p
              onClick={() =>
                companyVatNumberClipboard.copy(data.company.vatNumber)
              }
              className="cursor-pointer"
            >
              <b>{data.company.vatNumber}</b>
            </p>
          </div>

          <p className="text-sm text-center sm:text-base text-mulled-wine dark:text-gray-400">
            Czechia, Prague
          </p>
        </div>
      </main>

      <Notification
        title="Successfully copied to clipboard!"
        location="bottom"
        isShown={
          companyRegNumberClipboard.copied || companyVatNumberClipboard.copied
        }
      />
    </>
  );
};

const IndexPage: NextPage<Props> = () => (
  <>
    <div className="min-h-screen px-4 bg-whisper dark:bg-woodsmoke">
      <Alert
        title="Available for hire!"
        subtitle={
          <>
            <p>
              I am actively looking for work and I am available for an immediate
              start.{' '}
              <Link href="/contact">
                <a
                  className="font-medium text-yellow-700 underline hover:text-yellow-600"
                  data-splitbee-event="Contact page"
                >
                  More info you can find here
                </a>
              </Link>
              .
            </p>
          </>
        }
      />
      <NavBar />
      <MainContent />
    </div>
  </>
);

export default IndexPage;
