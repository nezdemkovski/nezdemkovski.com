const BusinessInfoWidget = () => (
  <div className="h-[300px] min-h-[300px] w-[335px] min-w-[335px] rounded-3xl bg-black px-7 py-5">
    <h2 className="font-unbounded flex flex-col pb-4 text-2xl font-bold text-white sm:text-3xl">
      <span>Business</span>
      <span>details</span>
    </h2>
    <p className="font-iawriterquattro pb-5 text-base leading-relaxed text-white">
      I am a Prague-based (Czechia) solopreneur registered with the company
      registration number (IČO){' '}
      <span className="rounded-md bg-white/30 px-2 py-0.5">07605901</span> and
      VAT (DIČ) ID{' '}
      <span className="rounded-md bg-white/30 px-2 py-0.5">CZ8911274350</span>.
    </p>
  </div>
);

export default BusinessInfoWidget;
