const BusinessInfoCard = () => (
  <div className="h-[300px] w-[335px] rounded-3xl bg-gradient-to-br from-[#026f86] to-[#01253e]">
    <div className="h-[300px] w-[335px] rounded-3xl bg-[url('/noise.svg')] bg-cover px-7 py-5">
      <h2 className="flex flex-col pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
        <span>Business</span>
        <span>details</span>
      </h2>
      <p className="pb-5 font-iawriterquattro text-base leading-relaxed text-white">
        I am a Prague-based (Czechia) solopreneur registered with the company
        registration number (IČO){' '}
        <span className="rounded-md bg-black bg-opacity-40 px-2 py-0.5">
          07605901
        </span>{' '}
        and VAT (DIČ) id{' '}
        <span className="rounded-md bg-black bg-opacity-40 px-2 py-0.5">
          CZ8911274350
        </span>
        .
      </p>
    </div>
  </div>
);

export default BusinessInfoCard;
