// import Notification from '@components/Notification';

const data = {
  fullName: 'Yuri Nezdemkovski',
  occupation: 'Software Developer',
  company: {
    regNumberTitle: 'Company registration number (IČO)',
    regNumber: '07605901',
    vatNumberTitle: 'VAT registration number (DIČ)',
    vatNumber: 'CZ8911274350',
  },
};

const RootPage = () => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl pt-28 sm:px-6 sm:pt-60 lg:px-8">
          <h1 className="text-center font-lionandhare-bold text-5xl font-bold leading-10 text-mulled-wine dark:text-white sm:truncate sm:text-7xl">
            {data.fullName}
          </h1>
          <p className="mt-4 mb-10 text-center font-lionandhare-bold-italic text-3xl text-mulled-wine dark:text-gray-400 sm:text-4xl">
            {data.occupation}
          </p>

          <div className="mt-6 mb-2 text-center font-mono text-sm text-mulled-wine dark:text-gray-400 sm:text-base">
            <p>{data.company.regNumberTitle}:</p>
            <p
              // onClick={() =>
              //   companyRegNumberClipboard.copy(data.company.regNumber)
              // }
              className="cursor-pointer"
            >
              <b>{data.company.regNumber}</b>
            </p>
          </div>

          <div className="mb-2 text-center font-mono text-sm text-mulled-wine dark:text-gray-400 sm:text-base">
            <p>{data.company.vatNumberTitle}:</p>
            <p
              // onClick={() =>
              //   companyVatNumberClipboard.copy(data.company.vatNumber)
              // }
              className="cursor-pointer"
            >
              <b>{data.company.vatNumber}</b>
            </p>
          </div>

          <p className="text-center font-mono text-sm text-mulled-wine dark:text-gray-400 sm:text-base">
            Czechia, Prague
          </p>
        </div>
      </main>

      {/* <Notification
        title="Successfully copied to clipboard!"
        location="bottom"
        isShown={
          companyRegNumberClipboard.copied || companyVatNumberClipboard.copied
        }
      /> */}
    </>
  );
};

export default RootPage;
