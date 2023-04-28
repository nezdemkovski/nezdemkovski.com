const AboutMeCard = () => (
  <div className="h-[300px] w-[335px] rounded-3xl bg-gradient-to-l from-[#5C5C5C] to-[#0F1015]">
    <div className="h-[300px] w-[335px] rounded-3xl bg-[url('/noise.svg')] bg-cover px-7 py-5">
      <h2 className="pb-4 font-unbounded text-3xl font-bold text-white sm:text-3xl">
        About me
      </h2>
      <p className="pb-5 font-iawriterquattro text-base leading-relaxed text-white">
        Hello there, I&apos;m{' '}
        <span className="rounded-md bg-black bg-opacity-40 px-2 py-0.5 font-bold">
          Yuri
        </span>{' '}
        — a seasoned web developer with over 10 years of experience. Now, as a
        developer manager, I&apos;m passionate about leading teams and
        delivering top-notch results.
      </p>
    </div>
  </div>
);

export default AboutMeCard;
