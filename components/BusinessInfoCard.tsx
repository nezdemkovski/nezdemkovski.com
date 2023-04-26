const BusinessInfoCard = () => (
  <div className="relative inline-block h-[295px] w-[335px] rounded-3xl bg-black px-7 py-5 transition duration-300">
    <h2 className="flex flex-col pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
      <span>One-person</span>
      <span>business</span>
      <span>details</span>
    </h2>
    <p className="pb-5 font-iawriterquattro text-sm text-white sm:text-base">
      I am a Prague-based (Czechia) solopreneur registered with the company
      registration number (IČO){' '}
      <span className="rounded-md bg-slate-800 px-2 py-1 font-bold">
        07605901
      </span>{' '}
      and VAT (DIČ) id{' '}
      <span className="rounded-md bg-slate-800 px-2 py-1 font-bold">
        CZ8911274350
      </span>
      .
    </p>
  </div>
);

export default BusinessInfoCard;
